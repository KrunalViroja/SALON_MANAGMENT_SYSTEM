from django.db import models

# Create your models here.


class User(models.Model):
    FirstName = models.CharField(max_length=50)
    LastName = models.CharField(max_length=50)
    Email = models.EmailField()
    Phone = models.BigIntegerField(default=0)
    Password = models.CharField(max_length=50)
    status = models.CharField(max_length=30,default="Inactice")

    def __str__(self):
        return self.FirstName + " | " + self.Email

class Service_Category(models.Model):
    Service_Image = models.ImageField(upload_to='Service_Cat_Image/',default="")
    CategoryName = models.CharField(max_length=100)
    Desc = models.TextField(max_length=255)
  
    def __str__(self):
        return self.CategoryName


class Service(models.Model):
    Service_Category = models.ForeignKey(Service_Category,on_delete=models.CASCADE)
    Service_Name = models.CharField(max_length=100)
    MRP = models.BigIntegerField()
    Price = models.BigIntegerField()
    Description = models.TextField(max_length=255)


    def __str__(self):
        return self.Service_Name + " - " + self.Service_Category.CategoryName
    
class package(models.Model):
    pkg_name = models.CharField(max_length=100)
    pkg_price = models.BigIntegerField()
    pkg_desc = models.TextField(max_length=400)

    def __str__(self):
        return self.pkg_name

class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=200)
    message = models.TextField(max_length=500)

    def __str__(self):
        return self.name + "-" + self.email


class Expert(models.Model):
    fullname = models.CharField(max_length=50)
    Designation = models.CharField(max_length=100)
    Description = models.CharField(max_length=200)
    Image = models.ImageField(upload_to='Experts/',default="default.png")


    def __str__(self):
        return self.fullname

status_choice=(
    ('pending','pending'),
    ('accepted','accepted'),
    ('rejected','rejected'),
)

class Appointment(models.Model):
    Artist  = models.CharField(max_length=50)
    service = models.CharField(max_length=100)
    Fullname = models.CharField(max_length=50)
    date = models.DateField()
    time = models.CharField(max_length=50)
    phone = models.CharField(max_length=13)
    email = models.EmailField()
    # dob = models.CharField(max_length=50)
    message= models.TextField()
    status = models.CharField(choices=status_choice,max_length=100,default='pending')

    def __str__(self):
        return self.service + "  |  " +self.Fullname


class Feedback(models.Model):
    Service = models.CharField(max_length=50)
    user = models.CharField(max_length=50)
    message = models.TextField(max_length=300)
    added_date = models.DateField(auto_now_add=True)
    
    

class Photo_Gallary(models.Model):
    Name = models.CharField(max_length=50)
    Photo = models.ImageField(upload_to="Photo_Gallary/",default="")
