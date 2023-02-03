import requests

api_key = ''
url = 'https://api.themoviedb.org/3/movie/popular'


response = requests.get(url, params={'api_key': api_key, 'language': 'en-US', 'page': 1})

with open("data.json", "w") as file:
    file.write(requests.get(url, params={'api_key': api_key, 'language': 'en-US', 'page': 1}).text)

if response.status_code == 200:
    data = response.json()
    print(data)
else:
    print(f'Error: {response.status_code}')

