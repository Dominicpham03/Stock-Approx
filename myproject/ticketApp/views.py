from django.shortcuts import render

# Create your views here.
def ticket_app(request):
    return render(request,'ticketApp/ticketApp.html')