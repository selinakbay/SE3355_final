# Job Portal 

**Search for Jobs** by title, location, or company.
**Post Jobs** (Employers Only).
**User Authentication** (Login/Register using JWT).
**Apply for Jobs** (Users can submit applications).
**Job Listings** dynamically update as new jobs are added.
**Protected Routes** (Only logged-in users can post or apply).

---

# Tech Stack

**Frontend:** React, Axios, React Router  
**Backend:** Node.js, Express.js  
**Database:** MongoDB, Mongoose  
**Authentication:** JWT (JSON Web Token)  
**Hosting:** Localhost (for development)


# API Endpoints

                     Auth Routes
Method    	Endpoint	                   Description
POST	      /api/auth/register	         Register a new user
POST      	/api/auth/login	             Login & get token
                     Job Routes
Method	     Endpoint	                   Description
GET	         /api/jobs	                 Get all jobs
POST	       /api/jobs	                 Post a new job (Requires Auth)
GET	         /api/jobs/:id	             Get a specific job

# Usage

# 1-User Signup/Login

Navigate to /register to create an account.
Login to get access to post jobs.

# 2-Posting a Job (Employers Only)

Go to /post-job and submit job details.
# 3-Searching for Jobs

Use the homepage search bar to filter jobs.
# 4-Applying for a Job

Click on a job and submit an application.

# Licence 
This project is open-source and available under the MIT License.
