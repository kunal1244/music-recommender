import json
import pandas as pd
import requests
import sys


class CreatePlaylist:

    def __init__(self):
        self.user_id = sys.argv[2]
        self.token = sys.argv[1]

    def create_playlist(self):
        request_body = json.dumps({
            "name": "New Recommendations!",
            "description": "Recommendations obtained from Music-Recommender. Enjoy!",
            "public": True
        })
        query = "https://api.spotify.com/v1/users/{}/playlists".format(self.user_id)
        response = requests.post(
            query,
            data=request_body,
            headers={
                "Content-Type":"application/json",
                "Authorization":"Bearer {}".format(self.token)
            }
        )
        response_json = response.json()

        # playlist id
        return response_json["id"]


    def add_to_playlist(self):
        uris = pd.read_csv("recommendations.csv", header=None)[0].tolist()
        for i in range(len(uris)):
            uris[i] = "spotify:track:" + uris[i]

        # Create new playlist
        playlist_id = self.create_playlist()

        # Populate playlist
        request_data = json.dumps(uris)
        query = "https://api.spotify.com/v1/playlists/{}/tracks".format(playlist_id)

        response = requests.post(
            query,
            data=request_data,
            headers={
                "Content-Type": "application/json",
                "Authorization": "Bearer {}".format(self.token)
            }
        )

        response_json = response.json()
        return response_json


if __name__ == '__main__':
    cp = CreatePlaylist()
    cp.add_to_playlist()

