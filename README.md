## Falak HR Backend API Documentation

This document provides a comprehensive overview of the Falak HR backend API endpoints.

**Base URL:** `http://localhost:8000/api/` (for local development) or your deployed server's base URL.

**API Root:** `GET /api/` - Provides a list of all available API endpoints (if implemented).

**Authentication:**

All API endpoints (except token endpoints) require JWT authentication.  Include a valid access token:

```
Authorization: Bearer <your_access_token>
```

*   **Obtain Tokens (`POST /api/token/`):**

    *   Request Body (JSON):

        ```json
        {
            "username": "your_username",  // string, required
            "password": "your_password"   // string, required
        }
        ```

    *   Response (JSON):

        ```json
        {
            "refresh": "your_refresh_token", // string
            "access": "your_access_token"    // string
        }
        ```

*   **Refresh Tokens (`POST /api/token/refresh/`):**

    *   Request Body (JSON):

        ```json
        {
            "refresh": "your_refresh_token" // string, required
        }
        ```

    *   Response (JSON):

        ```json
        {
            "access": "your_new_access_token" // string
        }
        ```
*   **Logout:** (If Implemented `POST /api/token/logout/`)
    * Request Body (JSON):
      ```json
      {
          "refresh": "your_refresh_token" // string, required
      }
        ```

---

**1. Companies Endpoints**

*   **Base URL:** `/api/companies/`

| Method | Endpoint                      | Description                                           | Permissions          | Response (Success)                        | Response (Error)                                     |
| :----- | :---------------------------- | :---------------------------------------------------- | :------------------- | :------------------------------------------ | :--------------------------------------------------- |
| GET    | `/api/companies/`             | List all root-level companies (paginated).           | `IsAuthenticated`    | `200 OK`, List of Company objects           | `401`, `403`                                        |
| POST   | `/api/companies/`             | Create a new company.                                | `IsAdminUserOrReadOnly` | `201 Created`, Created Company object     | `400` (validation errors), `401`, `403`             |
| GET    | `/api/companies/{id}/`        | Retrieve a specific company by ID.                  | `IsAuthenticated`    | `200 OK`, Company object                    | `401`, `403`, `404`                                  |
| PUT    | `/api/companies/{id}/`        | Update a company (full update).                    | `IsAdminUserOrReadOnly` | `200 OK`, Updated Company object            | `400` (validation errors), `401`, `403`, `404`     |
| PATCH  | `/api/companies/{id}/`        | Update a company (partial update).                 | `IsAdminUserOrReadOnly` | `200 OK`, Updated Company object            | `400` (validation errors), `401`, `403`, `404`     |
| DELETE | `/api/companies/{id}/`        | Delete a company.                                    | `IsAdminUserOrReadOnly` | `204 No Content`                            | `401`, `403`, `404`                                  |
| GET    | `/api/companies/{id}/subcompanies/` | List sub-companies of a specific company.         | `IsAuthenticated`    | `200 OK`, List of Company objects           | `401`, `403`, `404` (if parent not found)         |
| GET    | `/api/companies/{id}/employees/`    | List employees belonging to a specific company. | `IsAuthenticated`    | `200 OK`, List of UserProfile objects       | `401`, `403`, `404` (if company not found)        |

*   **Company Object (Request and Response):**

    ```json
    {
        "id": 1,                                // integer, read-only
        "name": "Company Name",                 // string (max_length=255), required, unique
        "parent_company": null,                 // integer (Company ID) or null, optional
        "address": "123 Main St",               // string, optional
        "contact_email": "info@company.com",     // string (email format), optional
        "contact_phone": "555-1212",            // string, optional
        "created_at": "2024-10-27T10:00:00Z",  // datetime, read-only
        "updated_at": "2024-10-27T11:30:00Z"   // datetime, read-only
    }
    ```

*   **Filtering (Companies):**  `GET /api/companies/?parent_company={id}`
*   **Searching (Companies):** `GET /api/companies/?search={term}` (Searches: `name`, `address`, `contact_email`, `contact_phone`)
*   **Ordering (Companies):** `GET /api/companies/?ordering={field}` (Orderable: `name`, `created_at`; Default: `name`)

---

**2. Users Endpoints**

*   **Base URL:** `/api/users/`

| Method | Endpoint             | Description                                     | Permissions               | Response (Success)                  | Response (Error)                         |
| :----- | :------------------- | :---------------------------------------------- | :------------------------ | :-------------------------------------- | :--------------------------------------- |
| GET    | `/api/users/`        | List all user profiles (paginated).              | `IsAdminOrManagerOrSelf`   | `200 OK`, List of UserProfile objects   | `401`, `403`                             |
| POST   | `/api/users/`        | Create a new user profile.                     | `IsAuthenticated`         | `201 Created`, New UserProfile object  | `400` (validation errors), `401`, `403` |
| GET    | `/api/users/{id}/`   | Retrieve a specific user profile by ID.         | `IsAdminOrManagerOrSelf`   | `200 OK`, UserProfile object            | `401`, `403`, `404`                      |
| PUT    | `/api/users/{id}/`   | Update a user profile (full update).          | `IsAdminOrManagerOrSelf`   | `200 OK`, Updated UserProfile object    | `400` (validation errors), `401`, `403`, `404` |
| PATCH  | `/api/users/{id}/`   | Update a user profile (partial update).       | `IsAdminOrManagerOrSelf`   | `200 OK`, Updated UserProfile object    | `400` (validation errors), `401`, `403`, `404` |
| DELETE | `/api/users/{id}/`   | Delete a user profile.                         | Likely admin/manager only  | `204 No Content`                        | `401`, `403`, `404`                      |

*   **UserProfile Object (Request and Response):**

    ```json
    {
        "id": 2,                                // integer, read-only
        "user": {                              // Nested User object (from Django's auth.User)
            "id": 3,                            // integer, read-only
            "username": "johndoe",              // string, required, unique
            "password": "hashed_password",      // string, write-only, required (set on user creation)
            "email": "john.doe@example.com",    // string (email format), required
            "first_name": "John",               // string, optional
            "last_name": "Doe"                  // string, optional
        },
        "company": 1,                           // integer (Company ID), required
        "role": "employee",                     // string (choices: "admin", "manager", "employee"), required, default: "employee"
        "phone_number": "555-9876",             // string, optional
        "department": "Marketing",              // string, optional
        "job_title": "Marketing Specialist",     // string, optional
        "created_at": "2024-10-27T12:00:00Z",  // datetime, read-only
        "updated_at": "2024-10-27T13:45:00Z"   // datetime, read-only
    }
    ```

    **Important Notes for User Creation (POST):**
    *   You *must* provide the nested `user` object with `username`, `password`, and `email`.
    *   You *must* provide the `company` ID.
    *   The `role` defaults to "employee" if not provided.
    * When updating a user, you can send the `user` ID directly, if you don't need to modify any of `user` fields.

*   **Filtering (Users):**
    *   `GET /api/users/?company={id}`
    *   `GET /api/users/?role={role}`
*   **Searching (Users):** `GET /api/users/?search={term}` (Searches: `user__username`, `user__email`, `job_title`, `department`)
* **Ordering (Users):** Implement as needed, similar to Companies.  Use the `ordering` query parameter.

---

**3. Projects Endpoints**

*   **Base URL:** `/api/projects/`

| Method | Endpoint             | Description                                       | Permissions         | Response (Success)               | Response (Error)                                     |
| :----- | :------------------- | :------------------------------------------------ | :------------------ | :----------------------------------- | :--------------------------------------------------- |
| GET    | `/api/projects/`      | List all projects (paginated, filterable).       | `IsAuthenticated`   | `200 OK`, List of Project objects    | `401`, `403`                                        |
| POST   | `/api/projects/`      | Create a new project.                             | `IsAuthenticated`   | `201 Created`, New Project object   | `400` (validation errors), `401`, `403`           |
| GET    | `/api/projects/{id}/` | Retrieve a specific project by ID.               | `IsAuthenticated`   | `200 OK`, Project object             | `401`, `403`, `404`                                  |
| PUT    | `/api/projects/{id}/` | Update a project (full update).                 | `IsAuthenticated`   | `200 OK`, Updated Project object     | `400` (validation errors), `401`, `403`, `404`     |
| PATCH  | `/api/projects/{id}/` | Update a project (partial update).              | `IsAuthenticated`   | `200 OK`, Updated Project object     | `400` (validation errors), `401`, `403`, `404`     |
| DELETE | `/api/projects/{id}/` | Delete a project.                                 | `IsAuthenticated`   | `204 No Content`                     | `401`, `403`, `404`                                  |

* **Project Object (Request and Response):**

    ```json
    {
    "id": 1, // integer, read-only
    "company": 1, // integer (Company ID), required
    "name": "Project Alpha", // string (max_length=255), required
    "description": "A very important project.", // string, optional
    "start_date": "2024-11-01", // string (date format: YYYY-MM-DD), optional
    "end_date": "2025-02-28", // string (date format: YYYY-MM-DD), optional
    "status": "in_progress", // string (choices: "planning", "in_progress", "completed", "on_hold"), required, default: "planning"
    "manager": 2, // integer (UserProfile ID), optional
    "manager_name": "admin", // string, in the response, readonly
    "team_members": [3, 4, 5], // array of integers (UserProfile IDs), optional
    "team_members_details": [ // string, in the response, readonly
        {
            "id": 2,
            "user": {
                "id": 2,
                "username": "manager1",
                "email": "manager1@example.com",
                "first_name": "",
                "last_name": ""
            },
            "company": 1,
            "company_name": "Falak HR Main 3",
            "role": "manager",
            "phone_number": "",
            "department": "",
            "job_title": "",
            "created_at": "2025-02-17T12:17:42.761015Z",
            "updated_at": "2025-02-17T12:17:42.761015Z"
        },
    ],
    "created_at": "2024-10-27T14:00:00Z", // datetime, read-only
    "updated_at": "2024-10-27T15:15:00Z" // datetime, read-only
    }
    ```

*   **Filtering (Projects):**
    *   `GET /api/projects/?company={id}`
*   **Ordering (Projects):**
    *    `GET /api/projects/?ordering={field}` (Orderable: `name`, `start_date`, `end_date`, `status`, `created_at`; Default: `-created_at`)

---

**4. Tasks Endpoints**

*   **Base URL:** `/api/tasks/`

| Method | Endpoint          | Description                                           | Permissions                                      | Response (Success)            | Response (Error)                                 |
| :----- | :---------------- | :---------------------------------------------------- | :----------------------------------------------- | :-------------------------------- | :----------------------------------------------- |
| GET    | `/api/tasks/`     | List all tasks (paginated, filterable, orderable).   | `IsAuthenticated, IsAdminOrManagerOrAssignedEmployee` | `200 OK`, List of Task objects   | `401`, `403`                                     |
| POST   | `/api/tasks/`     | Create a new task.  Requires a `project` ID.         | `IsAuthenticated, IsAdminOrManagerOrAssignedEmployee` | `201 Created`, New Task object  | `400` (validation, missing project), `401`, `403` |
| GET    | `/api/tasks/{id}/`| Retrieve a specific task by ID.                       | `IsAuthenticated, IsAdminOrManagerOrAssignedEmployee` | `200 OK`, Task object              | `401`, `403`, `404`                              |
| PUT    | `/api/tasks/{id}/`| Update a task (full update).                          | `IsAuthenticated, IsAdminOrManagerOrAssignedEmployee` | `200 OK`, Updated Task object     | `400` (validation errors), `401`, `403`, `404`   |
| PATCH  | `/api/tasks/{id}/`| Update a task (partial update).                       | `IsAuthenticated, IsAdminOrManagerOrAssignedEmployee` | `200 OK`, Updated Task object     | `400` (validation errors), `401`, `403`, `404`   |
| DELETE | `/api/tasks/{id}/`| Delete a task.                                       | `IsAuthenticated, IsAdminOrManagerOrAssignedEmployee` | `204 No Content`                  | `401`, `403`, `404`                              |

* **Task Object (Request and Response):**

    ```json
    {
        "id": 3,                                // integer, read-only
        "project": 1,                           // integer (Project ID), required
        "assigned_to": [2, 4],                  // array of integers (UserProfile IDs), optional
        "title": "Design UI Mockups",           // string (max_length=255), required
        "description": "Create mockups for...",  // string, optional
        "status": "to_do",                      // string (choices: "to_do", "in_progress", "completed", "on_hold"), required, default: "to_do"
        "due_date": "2024-11-15",                // string (date format: YYYY-MM-DD), optional
        "created_at": "2024-10-27T16:30:00Z",  // datetime, read-only
        "updated_at": "2024-10-27T17:00:00Z"   // datetime, read-only
    }
    ```
*   **Filtering (Tasks):**
    *   `GET /api/tasks/?project={project_id}`
    *   `GET /api/tasks/?assigned_to={user_id}`
    *  `GET /api/tasks/?status={status}`
*   **Ordering (Tasks):**
    *   `GET /api/tasks/?ordering={field}` (Orderable: `title`, `due_date`, `status`, `created_at`; Default: `-created_at`)

---

**Error Handling:**

API responses use standard HTTP status codes:

*   `2xx`: Success
*   `400 Bad Request`: Invalid input, missing fields.  Response body will often include details.
*   `401 Unauthorized`: Authentication required, or invalid credentials.
*   `403 Forbidden`: User is authenticated but lacks permission.
*   `404 Not Found`: Resource not found.
*   `500 Internal Server Error`: Server error.

**Pagination:**

List endpoints are paginated:

*   Use the `page` query parameter (e.g., `?page=2`).
*   Default page size is in Django settings (`REST_FRAMEWORK.PAGE_SIZE`).
*   Pagination metadata (next/previous page URLs, total count) is in the response. Example:

```json
{
    "count": 123,
    "next": "http://localhost:8000/api/companies/?page=2",
    "previous": null,
    "results": [ /* ... array of objects ... */ ]
}
```