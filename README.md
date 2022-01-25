# restaurants-api
## Version: 1.0

#### Setup

```bash
npm install && npm start
```

### /restaurants

#### GET
##### Summary:

Get All Restaurants

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

null

#### POST
##### Summary:

Create Restaurant

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

### /restaurants/{id}

#### GET
##### Summary:

Get Restaurant

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | The restaurant ID | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

null

#### PATCH
##### Summary:

Update Restaurant

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | The restaurant ID | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

null

#### DELETE
##### Summary:

Delete Restaurant

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | The restaurant ID | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

### /restaurants/cuisines

#### GET
##### Summary:

Get Restaurant Cuisine

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

null

### /users/login

#### POST
##### Summary:

Login User

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

null

### /users/register

#### POST
##### Summary:

Register User

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

null

### /restaurants/review

#### GET
##### Summary:

Get All Reviews

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

null

### /restaurants/review/{id}

#### GET
##### Summary:

Get Review

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | The review ID | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

null

#### POST
##### Summary:

Create Review

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | The review ID | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearer | |

#### PATCH
##### Summary:

Update Review

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | The review ID | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearer | |

#### DELETE
##### Summary:

Delete Review

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | The review ID | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearer | |

### /users/{id}

#### DELETE
##### Summary:

Delete User

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | The user ID | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

#### GET
##### Summary:

Get One User

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | The user ID | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

null

#### PATCH
##### Summary:

Update User

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | The user ID | Yes | string |
| Authorization | header |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |
