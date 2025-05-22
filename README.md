# Github Dashboard Assignment

### Deployed Link

- Live link: https://githubdashboardassignment.netlify.app/
- Repo Link: https://github.com/prajesh9921/Github-Dashboard-Assignment

## Getting Started

Follow these steps to run the application locally:

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/prajesh9921/Github-Dashboard-Assignment.git

   ```

2. Install Dependencies:

   ```bash
   npm install

   ```

3. Start the development server:
   ```bash
   npm start
   ```

### File Structure

```
src/
├── components/
│   ├── ErrorDisplay.tsx
|   ├── IssueCard.tsx
|   ├── LoadingSpinner.tsx
│   ├── NavBar.tsx
│   ├── Pagination.tsx
│   ├── RepositoryCard.tsx
│   ├── SearchBar.tsx
│   ├── UserCard.tsx
├── pages/
|   ├── IssuePage.tsx - When you search for a repo and click on issues button then the issues page opens that page code is here.
|   ├── RepositoryPage.tsx - When you search for a repo it will redirect you to repository page.
│   ├── SearchPage.tsx - Search page where you search for repo.
│   ├── UserProfilePage.tsx - When you search for user profile and click on any profile then this page opens.
│   ├── UserSearchPage.tsx - Search page code for userProfiles is here.
├── services/
│   ├── github.ts - All of the API calls are defined here.
├── store/ - Reducx toolkit stores are located in this file. Basically the state of the application
│   ├── issueSlice.tsx
│   ├── store.tsx
├── App.tsx  - All routes are defined here
```

### Images
![image](https://github.com/user-attachments/assets/01b75188-097d-49c8-8b72-609edb3c1798)
![image](https://github.com/user-attachments/assets/057bc7da-adaf-4bf5-8c35-c3afa96c7765)
![image](https://github.com/user-attachments/assets/d761176d-1710-488e-aaeb-423843521de7)
![image](https://github.com/user-attachments/assets/4d4749d1-a917-4ec1-a371-2924e2e6ce4e)
![image](https://github.com/user-attachments/assets/9373e9b3-3d08-4927-99f2-88b19b5ebb54)
![image](https://github.com/user-attachments/assets/0b88cf38-ccf8-476d-8077-412d973b4918)
![image](https://github.com/user-attachments/assets/b73ed05a-3de0-4c2b-b061-82554f966c2b)
