import os
import requests
from django.shortcuts import render
from dotenv import load_dotenv
from django.contrib.auth.forms import UserCreationForm


def configure():
    load_dotenv()


configure()

def explore(request):
    return render(request,'explore.html',)

def create(request):
    return render(request,'create.html')





base_url_spoonacular = 'https://api.spoonacular.com'

def getMealPlan(number, include_tags=None, exclude_tags=None):
    include_tags = include_tags or []
    exclude_tags = exclude_tags or []

    in_tags = ','.join(include_tags) if include_tags else ''
    ex_tags = ','.join(exclude_tags) if exclude_tags else ''
    endpoint = f'/recipes/random?number={number}&includeNutrition=true'
    
    if in_tags:
        endpoint += f'&tags={in_tags}'
    if ex_tags:
        endpoint += f'&excludeIngredients={ex_tags}'
    
    url = f'{base_url_spoonacular}{endpoint}'
    params = {
        'apiKey': os.getenv('api_key_food')
    }
    response = requests.get(url, params=params)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error fetching meal plan: {response.status_code} - {response.text}")
        return None

def meal_plan_view(request):
    number = 100 # Specify the number of meal plans you want to fetch
    include_tags = ['asian']
    exclude_tags = ['nuts']

    meal_plan_data = getMealPlan(number, include_tags, exclude_tags)
    
    if isinstance(meal_plan_data, dict):  # Check if the response is a dictionary (successful fetch)
        meal_plans = meal_plan_data.get('recipes', [])
    else:
        meal_plans = []

    return render(request, 'home.html', {'meal_plans': meal_plans})

def cusine_tab():
    return 0



def register(request):
    form = UserCreationForm()
    return render(request,'register.html',{"form": form})








