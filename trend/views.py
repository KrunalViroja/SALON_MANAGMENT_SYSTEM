from django.shortcuts import render,redirect
from django.conf import settings
from . models import *
from random import *
from django.core.mail import send_mail
# Create your views here.

data = {}
expert = Expert.objects.all()
service = Service.objects.all()
print(service)
ser_cat = Service_Category.objects.all()
Photos = Photo_Gallary.objects.all()
data['experts'] = expert
data['service'] = service
data['cat'] = ser_cat
data['Photos'] = Photos

data = {
    'experts': expert,
    'service':service,
    'cat':ser_cat,
    'Photos':Photos,
}

def index(request):
    expert = Expert.objects.all()
    service = Service.objects.all()
    print(service)
    ser_cat = Service_Category.objects.all()
    Photos = Photo_Gallary.objects.all()
    data['experts'] = expert
    data['service'] = service
    data['cat'] = ser_cat
    data['Photos'] = Photos

    return render(request, "index.html",data)

def signup(request):
    if request.method == "POST":
        fname = request.POST.get('fname')
        lname = request.POST.get('lname')
        email = request.POST.get('email')
        mobile = request.POST.get('phone')
        pw = request.POST.get('pass')
        cpw = request.POST.get('cpass')

        print(fname,lname,email,mobile,pw,cpw)

        try:
            user = User.objects.get(Email = email)
            if user:
                msg = "This Email Is Already Used."
                data['msg'] = msg
                return render(request, 'signup.html',data)

        except Exception as e:
            print(e)
            if pw==cpw:
                gotp = randint(1000,9999)
                print(gotp)
                subject =  "OTP For OrangeFitness Signup Verification "
                message = "Your Otp is "+str(gotp)
                reciver = [email,]
                sender = settings.EMAIL_HOST_USER

                send_mail(subject,message,sender,reciver)
                new_user = User.objects.create(FirstName = fname,LastName = lname,Phone=mobile,Email= email,Password = pw)
                print("Create USER ")
                data['gotp'] = gotp
                data['email'] = email
                return render(request,'signup_otp.html',data)
            else:
                msg = "Please Enter Valid Confirm Password."
                data['msg'] = msg
                return render(request,'signup.html',data)


    else:
        return render(request,"signup.html",data)

def check_otp(request):
    if request.method == "POST":
        gotp = request.POST.get('gotp')
        otp = request.POST.get('otp')
        email = request.POST.get('email')


        if gotp == otp:
            user = User.objects.get(Email=email)
            user.status = "Active"
            user.save()
            request.session['email'] = user.Email
            request.session['name'] = user.FirstName
            
            print("GO TO INDEX PAGE ")
            return redirect('index')

        else:
            msg = "Your Otp Is Invalid. Try Again"
            data['msg'] = msg
            data['gotp'] = gotp
            data['email'] = email
            return render(request,"signup_otp.html",data)
    else:
        return render (request,'otp.html')


def login(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        try:
            user = User.objects.get(Email=email)
            if user:
                if user.Password == password:
                    if user.status == "Active":
                        request.session['email']=user.Email
                        request.session['name']=user.FirstName
                        return redirect('index')
                    else:
                        gotp = randint(1000,9999)
                        print(gotp)
                        subject =  "OTP For Tread Salon Verification"
                        message = "Your Otp is "+str(gotp)
                        reciver = [email,]
                        sender = settings.EMAIL_HOST_USER
                        send_mail(subject,message,sender,reciver) 
                        data['gotp'] = gotp
                        data['email'] = email
                        return render(request,'signup_otp.html',data)

                    
                else:
                    msg = "Password is Incorrect!"
                    data['login_msg'] = msg
                    return render(request, 'login.html',data)
                    
        except Exception as e:
            print(e)
            msg = "First Do Signup. You are Not Register With Us !"

            return render(request, 'signup.html',{'login_msg':msg})
    else:
        return render(request,"login.html")


def logout(request):
    if request.session.get('email'):
        del request.session['email']
        del request.session['name']
        return redirect('index')
    else:
        return redirect('index')



def service(request):
    ser_cat = Service_Category.objects.all()
    print(ser_cat)
    data['cat'] = ser_cat
    return render(request,'service.html',data)

def single_service(request,pk):
    cat = Service_Category.objects.get(pk=pk)
    all_service = Service.objects.filter(Service_Category=cat)
    
    return render(request,'single_service.html',{'all_service':all_service,'cat':cat})

def about(request):
    return render(request, "about.html",data)

def contact(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        phone = request.POST.get('phone')
        msg = request.POST.get('msg')

        contact = Contact.objects.create(name=name, email=email, phone=phone, message=msg)
        msgs = "Your Message Successfully Added."       
        return render(request,"contact-us.html",{'msg':msgs})
    else:
        return render(request,"contact-us.html")


def gallary(request):
    Photos = Photo_Gallary.objects.all()
    return render(request, "project.html",{'Photos':Photos})

def team(request):
    expert = Expert.objects.all()
    return render(request, "team.html",{'experts':expert})    

def male_service(request):
    return render(request, "team.html") 

def appointment(request):
    if request.method == "POST":
        artist = request.POST.get('barber')
        time= request.POST.get('time')
        date = request.POST.get('date')
        men_service= request.POST.get('men_service')
        women_service= request.POST.get('women_service')
        name= request.POST.get('name')
        email= request.POST.get('email')
        phone= request.POST.get('phone')
        message= request.POST.get('message')

        if men_service != "":
            service = men_service
        else:
            service = women_service


        Appointment.objects.create(Artist=artist,service=service,Fullname=name,date=date,time=time,email=email,message=message,phone=phone)
        msg = "Your Appointment is Submited."
        data['msg'] = msg
        subject = "Appintment Confirm"
        message = "We Get Your Appointment. Thank You To Connect With Us."
        reciver = [email,]
        sender = settings.EMAIL_HOST_USER
        send_mail(subject,message,sender,reciver) 
        return render(request, "index.html",data)

def feedback(request):
    service = request.POST.get('service')
    user =request.POST.get('email')
    msg = request.POST.get('msg')

    Feedback.objects.create(Service=service,user=user,message=msg)
    msg = "Your Feedback Submited"
    data['msg'] = msg
    return redirect('index')
