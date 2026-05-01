# Zanzibar Lite

A production-oriented, lightweight implementation inspired by Google’s Zanzibar system for **fine-grained, relationship-based authorization (ReBAC)**.

This project demonstrates how to build a scalable permission system capable of handling complex access control logic across users, resources, and hierarchies.

---

## 🚀 Why This Project Exists

Traditional RBAC (Role-Based Access Control) struggles when:

* Permissions depend on relationships (e.g., user is editor via a team)
* Resources are hierarchical (organization → project → document)
* Access logic is dynamic and context-driven

**Zanzibar Lite solves this using relationship graphs.**

---

## 🧠 Core Idea (ReBAC)

Instead of static roles, we define relationships:

```id="c1a2x9"
user → relation → resource
```

Example:

```id="f93jd1"
user:64f1a2b9c8d123456789abcd → viewer → document:abc123def456
user:64f1a2b9c8d123456789abcd → member → organization:org789xyz
organization:org789xyz → owns → document:abc123def456
```

Permissions are computed dynamically via graph traversal.

---

## 🏗️ System Architecture

```id="m9q2ls"
                ┌──────────────┐
                │   Client     │
                └──────┬───────┘
                       │
                       ▼
                ┌──────────────┐
                │   API Layer  │
                └──────┬───────┘
                       │
         ┌─────────────┴─────────────┐
         ▼                           ▼
┌─────────────────┐        ┌─────────────────┐
│ Relationship DB │        │ Permission Eval │
│ (Tuples Store)  │        │ Engine          │
└─────────────────┘        └─────────────────┘
                                   │
                                   ▼
                          Decision (ALLOW/DENY)
```

---

## 📦 Relationship Tuple Model

All permissions are derived from tuples:

```id="tup123"
(object, relation, subject)
```

Example:

```id="tup456"
(document:abc123def456, viewer, user:64f1a2b9c8d123456789abcd)
(document:abc123def456, editor, user:64f1a2b9c8d123456789999)
(organization:org789xyz, member, user:64f1a2b9c8d123456789abcd)
```

---

## 🔐 Permission Evaluation Logic

Example rule:

```id="rule001"
can_view(document):
    viewer OR editor OR owner
```

Evaluation strategy:

* Direct relationship lookup
* Indirect inheritance (via organization/team)
* Recursive graph traversal
* Early exit for performance

---

## ⚙️ Tech Stack

* **Runtime:** Node.js
* **ODM:** Mongoose
* **Database:** MongoDB
* **Architecture:** Modular service-based design
* **Testing:** Jest (recommended)

---

## 📂 Project Structure

```id="str001"
src/
├── controllers/      # API handlers
├── services/         # Business logic
├── models/           # Mongoose schemas
├── routes/           # API routes
├── engine/           # Permission evaluation core
└── utils/            # Helpers

config/
tests/
```

---

## 🔌 API Design (Example)

### Add Relationship

```http id="api001"
POST /relations
```

```json id="api002"
{
  "object": "document:abc123def456",
  "relation": "viewer",
  "subject": "user:64f1a2b9c8d123456789abcd"
}
```

---

### Check Permission

```http id="api003"
POST /check
```

```json id="api004"
{
  "subject": "user:64f1a2b9c8d123456789abcd",
  "relation": "view",
  "object": "document:abc123def456"
}
```

Response:

```json id="api005"
{
  "allowed": true
}
```

---

## ▶️ Getting Started

Clone:

```bash id="run001"
git clone https://github.com/Venom589/zanzibar-lite.git
cd zanzibar-lite
```

Install:

```bash id="run002"
npm install
```

Run:

```bash id="run003"
npm run dev
```

---

## 🧪 Testing

```bash id="test001"
npm test
```

---

## ⚡ Performance Considerations

* Cache frequent checks using Redis
* Avoid deep recursive calls (limit traversal depth)
* Precompute derived relationships where possible
* Use indexed queries on relation tuples

---

## 🚧 Future Enhancements

* 🔁 Graph traversal optimization (BFS/DFS tuning)
* ⚡ Redis caching layer
* 📜 Policy DSL (Zanzibar-style schema language)
* 🌐 Multi-tenant architecture
* 📊 Admin UI for relationship management

---

## 🧩 Real-World Use Cases

* Google Docs-style sharing system
* SaaS multi-tenant platforms
* Repository access systems
* Enterprise IAM solutions

---

## 📚 Inspiration

* Google Zanzibar — Google’s global authorization system
* Relationship-Based Access Control (ReBAC)

---

## 🤝 Contributing

PRs are welcome. Open an issue before major changes.

---

## 📄 License

MIT License

---

## 👨‍💻 Author

**Project maintained by developer**

---

## ⭐ Final Note

This project demonstrates **real-world authorization system design**, not just CRUD logic.

Understanding and explaining this system clearly puts you in the **top tier of backend engineers**.
