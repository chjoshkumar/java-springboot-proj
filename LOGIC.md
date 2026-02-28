# Todo App: Logic & Communication Flow

This document provides a precise mapping of user actions to the specific files and line numbers where the logic is executed.

---

## 1. Flow: Adding a New Task

| Step | Action / Process | File Name | Line Number(s) |
| :--- | :--- | :--- | :--- |
| **1** | User clicks "Add Task" button (form submit) | `app.js` | [L14](file:///f:/java&springpro/todo-management/src/main/resources/static/js/app.js#L14) |
| **2** | JS calls `createTask()` | `app.js` | [L38-56](file:///f:/java&springpro/todo-management/src/main/resources/static/js/app.js#L38-56) |
| **3** | HTTP `POST` sent to `/api/tasks` | `app.js` | [L43](file:///f:/java&springpro/todo-management/src/main/resources/static/js/app.js#L43) |
| **4** | Controller receives request | `TaskController.java` | [L25-29](file:///f:/java&springpro/todo-management/src/main/java/com/example/todo/controller/TaskController.java#L25-29) |
| **5** | Service creates Task entity | `TaskServiceImpl.java` | [L25-33](file:///f:/java&springpro/todo-management/src/main/java/com/example/todo/service/TaskServiceImpl.java#L25-33) |
| **6** | Repository saves to Database | `TaskServiceImpl.java` | [L31](file:///f:/java&springpro/todo-management/src/main/java/com/example/todo/service/TaskServiceImpl.java#L31) |
| **7** | Hibernate inserts into SQL Table | `Task.java` | [L11-17](file:///f:/java&springpro/todo-management/src/main/java/com/example/todo/model/Task.java#L11-17) |

---

## 2. Flow: Completing a Task

| Step | Action / Process | File Name | Line Number(s) |
| :--- | :--- | :--- | :--- |
| **1** | User clicks checkbox | `app.js` | [L168](file:///f:/java&springpro/todo-management/src/main/resources/static/js/app.js#L168) |
| **2** | JS calls `toggleTaskStatus(id)` | `app.js` | [L78-92](file:///f:/java&springpro/todo-management/src/main/resources/static/js/app.js#L78-92) |
| **3** | HTTP `PATCH` sent to `/api/tasks/{id}/complete` | `app.js` | [L85](file:///f:/java&springpro/todo-management/src/main/resources/static/js/app.js#L85) |
| **4** | Controller handles complete request | `TaskController.java` | [L74-77](file:///f:/java&springpro/todo-management/src/main/java/com/example/todo/controller/TaskController.java#L74-77) |
| **5** | Service updates status to `COMPLETED` | `TaskServiceImpl.java` | [L75-80](file:///f:/java&springpro/todo-management/src/main/java/com/example/todo/service/TaskServiceImpl.java#L75-80) |
| **6** | Repository saves the update | `TaskServiceImpl.java` | [L78](file:///f:/java&springpro/todo-management/src/main/java/com/example/todo/service/TaskServiceImpl.java#L78) |

---

## 3. Flow: Editing a Task

| Step | Action / Process | File Name | Line Number(s) |
| :--- | :--- | :--- | :--- |
| **1** | User clicks "Edit" button | `app.js` | [L176](file:///f:/java&springpro/todo-management/src/main/resources/static/js/app.js#L176) |
| **2** | JS populates form: `startEditTask(id)` | `app.js` | [L107-125](file:///f:/java&springpro/todo-management/src/main/resources/static/js/app.js#L107-125) |
| **3** | User submits the updated form | `app.js` | [L14](file:///f:/java&springpro/todo-management/src/main/resources/static/js/app.js#L14) |
| **4** | JS calls `updateTask(id)` | `app.js` | [L58-76](file:///f:/java&springpro/todo-management/src/main/resources/static/js/app.js#L58-76) |
| **5** | HTTP `PUT` sent to `/api/tasks/{id}` | `app.js` | [L63](file:///f:/java&springpro/todo-management/src/main/resources/static/js/app.js#L63) |
| **6** | Service updates entity fields | `TaskServiceImpl.java` | [L55-64](file:///f:/java&springpro/todo-management/src/main/java/com/example/todo/service/TaskServiceImpl.java#L55-64) |

---

## 4. Flow: Deleting a Task

| Step | Action / Process | File Name | Line Number(s) |
| :--- | :--- | :--- | :--- |
| **1** | User clicks "Trash" icon | `app.js` | [L180](file:///f:/java&springpro/todo-management/src/main/resources/static/js/app.js#L180) |
| **2** | JS calls `deleteTask(id)` | `app.js` | [L94-105](file:///f:/java&springpro/todo-management/src/main/resources/static/js/app.js#L94-105) |
| **3** | HTTP `DELETE` sent to `/api/tasks/{id}` | `app.js` | [L98](file:///f:/java&springpro/todo-management/src/main/resources/static/js/app.js#L98) |
| **4** | Controller calls service delete | `TaskController.java` | [L65-68](file:///f:/java&springpro/todo-management/src/main/java/com/example/todo/controller/TaskController.java#L65-68) |
| **5** | Repository removes from DB | `TaskServiceImpl.java` | [L70](file:///f:/java&springpro/todo-management/src/main/java/com/example/todo/service/TaskServiceImpl.java#L70) |

---

## Summary of Core Files

*   **Frontend Logic**: `src/main/resources/static/js/app.js`
*   **REST API Layer**: `src/main/java/com/example/todo/controller/TaskController.java`
*   **Business Logic Layer**: `src/main/java/com/example/todo/service/TaskServiceImpl.java`
*   **Database Object**: `src/main/java/com/example/todo/model/Task.java`
*   **Database Bridge**: `src/main/java/com/example/todo/repository/TaskRepository.java`
