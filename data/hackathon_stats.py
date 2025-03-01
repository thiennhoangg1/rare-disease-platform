# -*- coding: utf-8 -*-
"""Untitled1.ipynb

Automatically generated by Colab.

Original file is located at
    https://colab.research.google.com/drive/1UTL_jv2DWtlX6dcTemq_AEFYp9SjiQXx
"""

# pip install openai

# pip install openai --upgrade

import requests
import pandas as pd
import plotly.express as px

# Function to fetch data from an open-source API
def fetch_disease_data(disease_name):
    # Replace with the actual API endpoint and parameters
    api_url = "https://disease.sh/v3/covid-19/countries"
    params = {
        "disease": disease_name,
        "format": "json"
    }

    try:
        response = requests.get(api_url, params=params)
        response.raise_for_status()  # Raise an error for bad status codes
        data = response.json()
        return data
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data: {e}")
        return None

# Function to process data and create a world map visualization
def visualize_disease_data(data):
    if not data:
        print("No data to visualize.")
        return

    # Convert data to a pandas DataFrame
    df = pd.DataFrame(data)

    # Ensure the data has the required columns (e.g., 'country' and 'cases')
    if 'country' not in df.columns or 'cases' not in df.columns:
        print("Data format is incorrect. Expected 'country' and 'cases' columns.")
        return

    # Create a choropleth map using Plotly
    fig = px.choropleth(
        df,
        locations="country",  # Column with country names
        locationmode="country names",  # Use country names for locations
        color="cases",  # Column to determine color intensity
        hover_name="country",  # Column to display on hover
        title=f"Global Impact of {disease_name}",
        color_continuous_scale=px.colors.sequential.Plasma
    )

    # Show the map
    fig.show()

# Main function
if __name__ == "__main__":
    # Take disease name as input
    disease_name = input("Enter the name of the rare disease: ")

    # Fetch data dynamically
    data = fetch_disease_data(disease_name)

    # Visualize the data on a world map
    visualize_disease_data(data)

