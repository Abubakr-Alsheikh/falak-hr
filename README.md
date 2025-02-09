## Falak HR Backend API Endpoints Summary for Frontend Developers

This document outlines the API endpoints for managing Companies, Employees, and Tasks. All endpoints are located under the base URL (assuming your Django development server): `http://localhost:8000/api/`.

**Authentication:**

*   **All API endpoints (except token endpoints) are protected by JWT (JSON Web Token) authentication.**
*   To access protected endpoints, you must include a valid **Access Token** in the `Authorization` header of your requests, using the `Bearer <your_access_token>` format.
*   **Obtain Tokens:**
    *   Endpoint: `POST /api/token/`
    *   Request Body (JSON):
        ```json
        {
            "username": "your_username",
            "password": "your_password"
        }
        ```
    *   Response: Returns an `access` token and a `refresh` token in JSON format.
*   **Refresh Tokens:**
    *   Endpoint: `POST /api/token/refresh/`
    *   Request Body (JSON):
        ```json
        {
            "refresh": "<your_refresh_token>"
        }
        ```
    *   Response: Returns a new `access` token (and potentially a new `refresh` token).

**Companies Endpoints:**

*   **Base Endpoint:** `/api/companies/`

    *   **`GET /api/companies/`**: **List Companies**
        *   **Authentication Required:** Yes
        *   **Functionality:** Retrieves a paginated list of all companies.
        *   **Pagination:** Responses are paginated. Use `page` query parameter to navigate pages (e.g., `/api/companies/?page=2`). Default page size is set on the backend (e.g., 10). Pagination links are included in response headers and body.
        *   **Filtering:**
            *   `filterset_fields`:
                *   `contact_email`: Filter companies by exact match of contact email (e.g., `?contact_email=info@example.com`).
                *   `address`: Filter companies by exact match of address (e.g., `?address=Riyadh`).
                *   `parent_company`: Filter companies by parent company ID (e.g., `?parent_company=123`).
        *   **Search:**
            *   `search_fields`:
                *   `name`: Search company names (partial, case-insensitive match - using `icontains`). Example: `?search=Falak` will find "Falak HR Main Company".
                *   `address`: Search company addresses (partial, case-insensitive match - using `icontains`).
        *   **Ordering:**
            *   `ordering_fields`:
                *   `name`: Order companies by name (e.g., `?ordering=name` for ascending, `?ordering=-name` for descending).
                *   `created_at`: Order companies by creation date (e.g., `?ordering=created_at`, `?ordering=-created_at`). Default ordering is by `name` (ascending).
    *   **`POST /api/companies/`**: **Create Company**
        *   **Authentication Required:** Yes (Permissions: `IsAdminUserOrReadOnly` - typically only admin users can create)
        *   **Request Body (JSON):**
            ```json
            {
                "name": "Company Name",
                "parent_company": null,  // or company ID if sub-company
                "address": "Company Address",
                "contact_email": "email@example.com",
                "contact_phone": "+1234567890"
            }
            ```
        *   **Response:** Returns the newly created company object in JSON format with status code `201 Created`.

    *   **`GET /api/companies/{id}/`**: **Retrieve Company**
        *   **Authentication Required:** Yes
        *   **Path Parameter:** `{id}` - Company ID.
        *   **Response:** Returns the company object with the specified ID in JSON format.

    *   **`PUT /api/companies/{id}/`**: **Update Company (Full Update)**
        *   **Authentication Required:** Yes (Permissions: `IsAdminUserOrReadOnly` - typically only admin users can update)
        *   **Path Parameter:** `{id}` - Company ID.
        *   **Request Body (JSON):**  Send the complete updated company object in JSON format (similar structure to POST request).
        *   **Response:** Returns the updated company object in JSON format.

    *   **`PATCH /api/companies/{id}/`**: **Partial Update Company**
        *   **Authentication Required:** Yes (Permissions: `IsAdminUserOrReadOnly` - typically only admin users can update)
        *   **Path Parameter:** `{id}` - Company ID.
        *   **Request Body (JSON):** Send only the fields you want to update in JSON format.
        *   **Response:** Returns the updated company object in JSON format.

    *   **`DELETE /api/companies/{id}/`**: **Delete Company**
        *   **Authentication Required:** Yes (Permissions: `IsAdminUserOrReadOnly` - typically only admin users can delete)
        *   **Path Parameter:** `{id}` - Company ID.
        *   **Response:** Returns status code `204 No Content` on successful deletion.

    *   **`GET /api/companies/{id}/subcompanies/`**: **List Sub-Companies**
        *   **Authentication Required:** Yes
        *   **Path Parameter:** `{id}` - Parent Company ID.
        *   **Functionality:** Retrieves a list of sub-companies for the specified parent company.
        *   **Response:** Returns a list of sub-company objects in JSON format.

    *   **`GET /api/companies/{id}/employees/`**: **List Company Employees**
        *   **Authentication Required:** Yes
        *   **Path Parameter:** `{id}` - Company ID.
        *   **Functionality:** Retrieves a list of employees belonging to the specified company.
        *   **Response:** Returns a list of employee objects in JSON format.

**Employees Endpoints:**

*   **Base Endpoint:** `/api/employees/`

    *   **`GET /api/employees/`**: **List Employees**
        *   **Authentication Required:** Yes
        *   **Functionality, Pagination, Filtering, Search, Ordering:** (Similar to Companies endpoint - pagination, filtering, search, and ordering can be implemented and configured for employees as well, though not explicitly defined in detail in this summary, assume similar capabilities can be added).
    *   **`POST /api/employees/`**: **Create Employee**
        *   **Authentication Required:** Yes (Permissions: `IsAuthenticated`, further permission control may be needed)
        *   **Request Body (JSON):**
            ```json
            {
                "user": {  // Nested User creation
                    "username": "employee_username",
                    "password": "employee_password",
                    "email": "employee@example.com",
                    "first_name": "Employee",
                    "last_name": "One"
                },
                "company": 1,  // Company ID
                "role": "employee", // or 'admin', 'manager'
                "phone_number": "+1234567890",
                "department": "Department Name",
                "job_title": "Job Title"
            }
            ```
        *   **Response:** Returns the newly created employee object in JSON format with status code `201 Created`.
    *   **`GET /api/employees/{id}/`**: **Retrieve Employee**
        *   **Authentication Required:** Yes (Permissions: `IsAdminOrManagerOrSelf` - Employees can access their own profile)
        *   **Path Parameter:** `{id}` - Employee ID.
    *   **`PUT /api/employees/{id}/`**: **Update Employee (Full Update)**
        *   **Authentication Required:** Yes (Permissions: `IsAdminOrManagerOrSelf` and potentially role-based restrictions for updates)
        *   **Path Parameter:** `{id}` - Employee ID.
        *   **Request Body (JSON):**  Send the complete updated employee object (including nested `user` data if updating user details).
    *   **`PATCH /api/employees/{id}/`**: **Partial Update Employee**
        *   **Authentication Required:** Yes (Permissions: `IsAdminOrManagerOrSelf` and role-based restrictions)
        *   **Path Parameter:** `{id}` - Employee ID.
        *   **Request Body (JSON):** Send only fields to update.
    *   **`DELETE /api/employees/{id}/`**: **Delete Employee**
        *   **Authentication Required:** Yes (Permissions: Role-based restrictions, likely admin/manager only)
        *   **Path Parameter:** `{id}` - Employee ID.

**Tasks Endpoints:**

*   **Base Endpoint:** `/api/tasks/`

    *   **`GET /api/tasks/`**: **List Tasks**
        *   **Authentication Required:** Yes
        *   **Functionality, Pagination, Filtering, Search, Ordering:** (Similar to Companies endpoint - pagination, filtering, search, and ordering can be implemented and configured for tasks as well, though not explicitly defined in detail in this summary, assume similar capabilities can be added).
    *   **`POST /api/tasks/`**: **Create Task**
        *   **Authentication Required:** Yes (Permissions: `IsAuthenticated`, role-based permissions needed for task creation)
        *   **Request Body (JSON):**
            ```json
            {
                "company": 1,  // Company ID
                "assigned_to": [1, 2], // Array of Employee IDs
                "title": "Task Title",
                "description": "Task Description",
                "status": "to_do", // or 'in_progress', 'completed', 'on_hold'
                "due_date": "2024-01-15" // YYYY-MM-DD format (optional)
            }
            ```
        *   **Response:** Returns the newly created task object in JSON format with status code `201 Created`.
    *   **`GET /api/tasks/{id}/`**: **Retrieve Task**
        *   **Authentication Required:** Yes (Permissions: `IsAdminOrManagerOrAssignedEmployee`)
        *   **Path Parameter:** `{id}` - Task ID.
    *   **`PUT /api/tasks/{id}/`**: **Update Task (Full Update)**
        *   **Authentication Required:** Yes (Permissions: `IsAdminOrManagerOrAssignedEmployee` and role-based update restrictions)
        *   **Path Parameter:** `{id}` - Task ID.
        *   **Request Body (JSON):** Send the complete updated task object.
    *   **`PATCH /api/tasks/{id}/`**: **Partial Update Task**
        *   **Authentication Required:** Yes (Permissions: `IsAdminOrManagerOrAssignedEmployee` and role-based update restrictions)
        *   **Path Parameter:** `{id}` - Task ID.
        *   **Request Body (JSON):** Send only fields to update.
    *   **`DELETE /api/tasks/{id}/`**: **Delete Task**
        *   **Authentication Required:** Yes (Permissions: Role-based restrictions, likely admin/manager only)
        *   **Path Parameter:** `{id}` - Task ID.

**Response Format:**

*   The API primarily returns responses in **JSON** format.
*   List endpoints are **paginated**.
*   Error responses will typically be in JSON format and include appropriate HTTP status codes (e.g., 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Internal Server Error).  You may have implemented a custom exception handler for more consistent error responses.

**What's Built for the Frontend:**

*   **Basic CRUD operations for Companies, Employees, and Tasks are implemented.**
*   **JWT Authentication is set up and enforced for all main endpoints.**
*   **Basic Role-Based Authorization is in place (though might need refinement).**
*   **List endpoints are paginated, filterable, searchable, and orderable (basic implementation, further customization possible).**