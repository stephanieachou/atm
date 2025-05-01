# ATM

This is a simple ATM app built with React and Node.js. Users can log in with their PIN, view their current account balance, and withdraw/deposit funds.

---

## Get Started

1. Clone the repo

   ```bash
   git clone git@github.com:stephanieachou/atm.git
   ```

   ```bash
   cd atm
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the app

   ```bash
   npm start
   ```

   - Note: This runs the frontend and backend concurrently.

4. In the browser, navigate to:
   ```
   http://localhost:5173/
   ```
   - Note: Mock user data can be found in `server/data/users.json` (ie, use an existing `id` to successfully log in).

---

## API Specifications

### Base URL:

```
  http://localhost:8000/api
```

### GET `/user/:id`

- **Description**: Fetches a single user by ID.
- **Parameters**:

  - `:id` _string (required)_

- **Response**:

  - 200 OK
    #### Body
    - **Media type**: application/json
    - **Type**: object
    - **Properties**:
      - `id`: _required (string)_
      - `currentBalance`: _required (number)_
      - `dailyWithdrawalTotal`: _required (number)_
      - `dailyWithdrawalLimit`: _required (number)_
      - `lastWithdrawalDate`: _required (string)_
    - **Example**:
      ```json
      {
        "id": "1111",
        "currentBalance": 10000,
        "dailyWithdrawalTotal": 0,
        "dailyWithdrawalLimit": 1000,
        "lastWithdrawalDate": "2025-04-30"
      }
      ```

- **Errors**:
  - 404 NOT FOUND
    #### Body
    - **Media type**: application/json
    - **Type**: object
    - **Example**:
      ```json
      { "error": "User not found" }
      ```
  - 500 SERVER ERROR
    #### Body
    - **Media type**: application/json
    - **Type**: object
    - **Example**:
      ```json
      { "error": "Internal server error" }
      ```

---

### PUT `/user/:id`

- **Description**: Updates an existing user by ID.
- **Parameters**:

  - `:id` _string (required)_

- **Body**:

  - **Media type**: application/json
  - **Type**: object
  - **Properties**:
    - `amount`: _required (number)_
    - `action`: _required (one of `deposit`, `withdrawal`)_
  - **Example**:
    ```json
    {
      "amount": 5000,
      "action": "withdrawal"
    }
    ```

- **Response**:

  - 200 OK
    #### Body
    - **Media type**: application/json
    - **Type**: object
    - **Properties**:
      - `user`: _required (object)_
        - `id`: _required (string)_
        - `currentBalance`: _required (number)_
        - `dailyWithdrawalTotal`: _required (number)_
        - `dailyWithdrawalLimit`: _required (number)_
        - `lastWithdrawalDate`: _required (string)_
    - **Example**:
      ```json
      {
        "user": {
          "id": "1111",
          "currentBalance": 10000,
          "dailyWithdrawalTotal": 0,
          "dailyWithdrawalLimit": 1000,
          "lastWithdrawalDate": "2025-04-30"
        }
      }
      ```

- **Errors**:
  - 404 NOT FOUND
    #### Body
    - **Media type**: application/json
    - **Type**: object
    - **Example**:
      ```json
      { "error": "User not found" }
      ```
  - 500 SERVER ERROR
    #### Body
    - **Media type**: application/json
    - **Type**: object
    - **Example**:
      ```json
      { "error": "Internal server error" }
      ```

---

## Tech Stack

- React (TypeScript)
- Express.js
- Node.js
- Vite
