### This is the assignment for file management using Django and React

#### How to run
1. Install the pip requirements present in requirements.txt    
  `pip install -r requirements.txt`   
2. Run the backend server   
  `cd filemanager`    
  `python3 manage.py runserver`    
  You might also have to perform    
  `python3 manage.py makemigrations`    
  `python3 manage.py migrate`    

3. Run the frontend server    
  `cd frontend`    
  `npm install`  (install the packages in package.json)  
  `npm run start`    
  
  
 #### Webpages      
 1. Login - to perform login    
 2. Signup - to create an account    
 3. Portal - to display files summary    
 4. Upload - to upload your files    
 5. Profile - to check and update your profile    


  #### Further scope of improvements
  1. Using user object as a foreign key in File table instead of user email
  2. Sorting the tables when clicked on column headers
  3. Search feature to search the files
  4. Hashing the passwords
