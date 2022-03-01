## 👨‍💻 Stack

- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [appwrite](https://appwrite.io/)
- [Icons by](https://app.streamlinehq.com/icons)

## 📑 Features

- [x] Authentication
- [x] A view to search for jobs by job title (must be possible without being authenticated)
  - [x] Display a job card with the following details: title, salary, company name, required skills
  - [x] Pagination should be available
- [x] User must be able to like / unlike a job
  - [x] A view with a list of liked jobs
- [x] Redirect to the apply url for the job

## 🤲 Appwrite Setup

### Collections

You'll need to create two collections

- Job collection (the actual job data will be stored here)
- Liked jobs collection (the collection will store a reference to the liked jobs for the users)

#### Schemas

<details>
<summary>Job collection schema</summary>
```json
{
    "$id": "620ab664318e3c4f4e15",
    "$read": [
        "role:all"
    ],
    "$write": [
        "role:all"
    ],
    "name": "jobs",
    "enabled": true,
    "permission": "collection",
    "attributes": [
        {
            "key": "companyName",
            "type": "string",
            "status": "available",
            "required": true,
            "array": false,
            "size": 255,
            "default": null
        },
        {
            "key": "createdAt",
            "type": "string",
            "status": "available",
            "required": true,
            "array": false,
            "size": 255,
            "default": null
        },
        {
            "key": "title",
            "type": "string",
            "status": "available",
            "required": true,
            "array": false,
            "size": 255,
            "default": null
        },
        {
            "key": "salary",
            "type": "string",
            "status": "available",
            "required": false,
            "array": false,
            "size": 255,
            "default": null
        },
        {
            "key": "skills",
            "type": "string",
            "status": "available",
            "required": true,
            "array": true,
            "size": 255,
            "default": null
        },
        {
            "key": "applyLink",
            "type": "string",
            "status": "available",
            "required": true,
            "array": false,
            "size": 255,
            "default": null
        }
    ],
    "indexes": [
        {
            "key": "title",
            "type": "fulltext",
            "status": "available",
            "attributes": [
                "title"
            ],
            "orders": [
                "ASC"
            ]
        }
    ]
}
```
</details>
<details>
<summary> Liked jobs schema</summary>
```json
{
    "$id": "620d7785cc50bea6a8d3",
    "$read": [],
    "$write": [],
    "name": "liked_jobs",
    "enabled": true,
    "permission": "document",
    "attributes": [
        {
            "key": "jobId",
            "type": "string",
            "status": "available",
            "required": true,
            "array": false,
            "size": 255,
            "default": null
        },
        {
            "key": "userId",
            "type": "string",
            "status": "available",
            "required": false,
            "array": false,
            "size": 255,
            "default": null
        }
    ],
    "indexes": [
        {
            "key": "userId",
            "type": "key",
            "status": "available",
            "attributes": [
                "userId"
            ],
            "orders": [
                "ASC"
            ]
        }
    ]
}
```
</details>

### Creating jobs

If you want to generate some jobs with data, feel free to use the "Generate data" feature.

![preview](assets/generate_data.png)

## 🌟 Preview

![preview](assets/preview.gif)
