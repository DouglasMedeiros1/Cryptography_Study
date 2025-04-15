# 🔐 Study on Cryptography

## 📘 Introduction

In this repository, I developed a project using **ChatGPT** and **GitHub Copilot** as support, which allows for the registration and deletion of encryption keys, both **Symmetric** and **Asymmetric**, as well as their usage in a simulated case.

## 🎓 Context

I am currently studying **Multiplatform Software Development** in college, and in the **fifth semester**, which I am currently attending, I have a course on **Application Security**. I developed a small project in **TypeScript** using **Node.js** and **React** to demonstrate a basic application that uses **Symmetric and Asymmetric cryptography**, including **RSA** and **AES algorithms**.

## Apresentation Video

📽️ [Clique aqui para assistir à apresentação](Midia/Apresentation.mkv)




## 🚀 How to Run

### ✅ Dependencies:
1. Make sure **Node.js** and **TypeScript** are installed on your machine.
2. Make sure **MySQL** is installed on your machine.

### ▶️ Steps:
1. Run the file `start-project.bat` located at the root of the project.
2. Wait while the system starts.
3. Enjoy the system! 🎉

---

## 🛠️ About the Project

### 1️⃣ Backend:

**Technologies used:** `Node.js` and `TypeScript`

It serves as the main component for connecting the **database** with the **application frontend** through the following routes:

- **GET:** `http://localhost:3001/api/aeskeys`  
  Returns the registered **Symmetric keys**

- **POST:** `http://localhost:3001/api/aeskeys`  
  Registers a new **Symmetric key**

- **DELETE:** `http://localhost:3001/api/aeskeys`  
  Deletes a **Symmetric key**

- **GET:** `http://localhost:3001/api/rsakeys`  
  Returns the registered **Asymmetric keys**

- **POST:** `http://localhost:3001/api/rsakeys`  
  Registers a new pair of **Asymmetric keys**

- **DELETE:** `http://localhost:3001/api/rsakeys`  
  Deletes a pair of **Asymmetric keys**

### 💾 MySQL:

Folder that stores the `.sql` file used in the **database**.

---

### 2️⃣ Frontend:

**Technologies used:** `React` and `TypeScript`

Connects to the backend and performs the operations requested by the user:

1. Registers and deletes **AES (Symmetric)** keys 🔒  
2. Registers and deletes **RSA (Asymmetric)** keys 🔐  
3. Encrypts and decrypts user messages using the registered **Symmetric keys**  
4. Encrypts and decrypts user messages using the registered **Asymmetric keys**

---
