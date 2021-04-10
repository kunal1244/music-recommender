import pandas as pd
import numpy as np
from imblearn.over_sampling import SMOTE

# Importing required libraries
import sklearn
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split
from sklearn.model_selection import GridSearchCV
# Models
from sklearn.ensemble import RandomForestClassifier

df = pd.read_csv("songs.csv")

features = pd.read_csv("SpotifyFeatures.csv")

features['same_artists'] = features.artist.isin(df.artist) 
features['same_track'] = features.track.isin(df.track) 
features["favorite"] = np.where((features["same_artists"] == True) & (features["same_track"] == True),1,0) # If both instances are True.
features = features.drop(["same_artists","same_track"],axis=1)


future = features.copy(deep=True)

features = features.drop(columns=['id', 'track', 'release_date'])

X = features.drop(columns=['favorite','artist','key','mode'])
y = features.favorite
oversample = SMOTE()
X, y = oversample.fit_resample(X, y)
X['favorite'] = y

X_train, X_test, y_train, y_test = train_test_split(X.drop(columns='favorite'), X.favorite,test_size = .20)


parameters = {
    'max_depth':[5],
    'n_estimators':[5]
}
clf = Pipeline([('CV',GridSearchCV(RandomForestClassifier(), parameters, cv = 5))])
clf.fit(X_train, y_train)

prediction = clf.predict(future.drop(columns=['track','id','favorite','artist','key','mode','release_date']))

future['prediction'] = prediction

future = future[(future['favorite']==0) & (future['prediction'] == 1)]

future = future['id'][:40]

future.to_csv("recommendations.csv", index=False, header=False)