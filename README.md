## Falak HR Backend API Documentation

This document provides a comprehensive overview of the Falak HR backend API endpoints, designed for seamless integration with the frontend application.

**Base URL:**  `http://localhost:8000/api/` (for local development) or your deployed server's base URL.

**API Root:** `GET /api/` -  This endpoint provides a list of all available API endpoints, useful for self-discovery.

**Authentication:**

*   **All API endpoints (except token endpoints) are protected by JWT (JSON Web Token) authentication.**
*   To access protected endpoints, you must include a valid **Access Token** in the `Authorization` header of your requests:  `Authorization: Bearer <your_access_token>`

*   **Obtain Tokens:**
    *   Endpoint: `POST /api/token/`
    *   Request Body (JSON):
        ```json
        {
            "username": "your_username",
            "password": "your_password"
        }
        ```
    *   Response (JSON):
        ```json
        {
            "refresh": "your_refresh_token",
            "access": "your_access_token"
        }
        ```

*   **Refresh Tokens:**
    *   Endpoint: `POST /api/token/refresh/`
    *   Request Body (JSON):
        ```json
        {
            "refresh": "your_refresh_token"
        }
        ```
    *   Response (JSON):
        ```json
        {
            "access": "your_new_access_token"
        }
        ```
*   **Logout:** (If Implemented `POST /api/token/logout/`)
    * Request Body (JSON):
      ```json
      {
          "refresh": "your_refresh_token"
      }
    ```

---

**1. Companies Endpoints**

*   **Base URL:** `/api/companies/`

| Method | Endpoint                     | Description                                         | Permissions                        | Request Body (Example)                                                     | Response (Success)                    |
|--------|------------------------------|-----------------------------------------------------|------------------------------------|---------------------------------------------------------------------------|---------------------------------------|
| GET    | `/api/companies/`            | List all companies (paginated, filterable, searchable). | `IsAuthenticated`                | N/A                                                                       | `200 OK`, List of Companies          |
| POST   | `/api/companies/`            | Create a new company.                               | `IsAdminUserOrReadOnly`            | `{"name": "NewCo", "address": "...", ...}`                               | `201 Created`, New Company             |
| GET    | `/api/companies/{id}/`       | Retrieve a specific company by ID.                 | `IsAuthenticated`                | N/A                                                                       | `200 OK`, Company                     |
| PUT    | `/api/companies/{id}/`       | Update a company (full update).                   | `IsAdminUserOrReadOnly`            | Full Company data (same as POST)                                            | `200 OK`, Updated Company              |
| PATCH  | `/api/companies/{id}/`       | Update a company (partial update).                | `IsAdminUserOrReadOnly`            | Partial Company data (e.g., `{"address": "New Address"}`)                 | `200 OK`, Updated Company              |
| DELETE | `/api/companies/{id}/`       | Delete a company.                                   | `IsAdminUserOrReadOnly`            | N/A                                                                       | `204 No Content`                     |
| GET    | `/api/companies/{id}/subcompanies/` | list the sub companies for companies         |   `IsAuthenticated`                  |  N/A                                                                       |  `200 Ok`, List of companies        |
| GET   |  `/api/companies/{id}/employees/`       |  List Company Employees                         |        `IsAuthenticated`                |   N/A                                                                    |       `200 Ok`, List of User Profiles  |

**Searching (Companies):**

*   Use the `search` query parameter: `?search=term`
*   Searches: `name`, `address` (case-insensitive partial match)

**Ordering (Companies):**

*   Use the `ordering` query parameter: `?ordering=field` (ascending) or `?ordering=-field` (descending)
*   Orderable fields: `name`, `created_at`
*   Default ordering: `name` (ascending)

---

**2. Users Endpoints**

*   **Base URL:** `/api/users/`

| Method | Endpoint              | Description                                     | Permissions                   | Request Body (Example)                                                                             | Response (Success)           |
|--------|-----------------------|-------------------------------------------------|-------------------------------|-------------------------------------------------------------------------------------------------------|---------------------------------|
| GET    | `/api/users/`         | List all user profiles (paginated).               | `IsAdminOrManagerOrSelf`      | N/A                                                                                               | `200 OK`, List of User Profiles |
| POST   | `/api/users/`         | Create a new user profile.                     | `IsAuthenticated`            | `{"user": {"username": "u", "password": "p", "email": "e@e.com"}, "company": 1, "role": "employee"}`     | `201 Created`, New User Profile |
| GET    | `/api/users/{id}/`    | Retrieve a specific user profile by ID.         | `IsAdminOrManagerOrSelf`      | N/A                                                                                               | `200 OK`, User Profile           |
| PUT    | `/api/users/{id}/`    | Update a user profile (full update).          | `IsAdminOrManagerOrSelf`      | Full UserProfile data (same as POST)                                                                  | `200 OK`, Updated User Profile   |
| PATCH  | `/api/users/{id}/`    | Update a user profile (partial update).       | `IsAdminOrManagerOrSelf`      | Partial UserProfile data (e.g., `{"department": "New Dept"}`)                                        | `200 OK`, Updated User Profile   |
| DELETE | `/api/users/{id}/`    | Delete a user profile.                         | Likely admin/manager only     | N/A                                                                                               | `204 No Content`                |

**Searching (Users):**

*   Use the `search` query parameter: `?search=term`
*   Searches:  `user__username`, `user__email`, `job_title`, `department` (case-insensitive partial match)

**Ordering (Users):**

*   Implement as needed, similar to Companies.  Use the `ordering` query parameter.

---

**3. Tasks Endpoints**

*   **Base URL:** `/api/tasks/`

| Method | Endpoint           | Description                                  | Permissions                               | Request Body (Example)                                                                 | Response (Success)          |
|--------|--------------------|----------------------------------------------|-------------------------------------------|------------------------------------------------------------------------------------------|-------------------------------|
| GET    | `/api/tasks/`      | List all tasks (paginated, orderable).        | `IsAdminOrManagerOrAssignedEmployee`    | N/A                                                                                      | `200 OK`, List of Tasks     |
| POST   | `/api/tasks/`      | Create a new task.                            | `IsAdminOrManagerOrAssignedEmployee`                       | `{"title": "T", "company": 1, "assigned_to": [1,2], "status": "to_do", "due_date": "2024-12-31"}` | `201 Created`, New Task        |
| GET    | `/api/tasks/{id}/` | Retrieve a specific task by ID.              | `IsAdminOrManagerOrAssignedEmployee`    | N/A                                                                                      | `200 OK`, Task                |
| PUT    | `/api/tasks/{id}/` | Update a task (full update).                 | `IsAdminOrManagerOrAssignedEmployee`    | Full Task data (same as POST)                                                             | `200 OK`, Updated Task         |
| PATCH  | `/api/tasks/{id}/` | Update a task (partial update).              | `IsAdminOrManagerOrAssignedEmployee`    | Partial Task data (e.g., `{"status": "in_progress"}`)                                   | `200 OK`, Updated Task         |
| DELETE | `/api/tasks/{id}/` | Delete a task.                                | Likely admin/manager only                | N/A                                                                                      | `204 No Content`             |

**Filtering (Tasks):**

*   Use query parameters: `?filter_field=value`
*   Available filters: `company`, `assigned_to`, `status`

**Ordering (Tasks):**

*   Use the `ordering` query parameter: `?ordering=field` (ascending) or `?ordering=-field` (descending)
*   Orderable fields:  `title`, `due_date`, `status`, `created_at`
*   Default ordering: `-created_at` (most recent first)

---

**Error Handling:**

*   Error responses will have appropriate HTTP status codes (e.g., `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, `500 Internal Server Error`) and may include error details in the response body. A `400` error will often include details about invalid fields.

**Pagination:**

*   List endpoints (`GET /api/companies/`, `GET /api/users/`, `GET /api/tasks/`) are paginated.
*   Use the `page` query parameter to specify the page number (e.g., `?page=2`).
*   The default page size is defined in your Django settings (likely using `REST_FRAMEWORK` settings).
*   Pagination information (next page, previous page, total count) is typically included in the response headers and/or body.  Check your specific pagination class for details.