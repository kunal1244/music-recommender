# Music Recommender

Created as a project for the course Cloud Computing (CS60118).

A cloud-based music recommendation API, where the worker nodes get a user's favorite songs/playlists from Spotify and extract relevant audio features from the said tracks. 
This data is passed on to the master node which uses machine learning libraries to return a playlist of recommended songs to the user, which is directly added to the user's Spotify profile.


Steps to use the hosted application - 

1. Log on to 68.183.247.110
2. Enter the Last.FM ID to base your recommendations on, and click on Submit (For testing - use "humblebumble_" without the quotes).
3. The top 10 artist and album names for the Last.FM profile should be visible on the dashboard. Click on 'Get Recommendations'.
4. You should receive a prompt that your recommendations are received by the service.
5. Log on to 68.183.247.110/login
6. You should be redirected to the Spotify authorization page. Login to your Spotify and grant the requisite access.
7. The recommended playlist should now be accessible at open.spotify.com or your Spotify application. Enjoy!
