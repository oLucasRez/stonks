from sklearn.model_selection import train_test_split

def generateParams(X, y):
    # 70% training and 30% test
    return train_test_split(X, y, test_size=0.25, random_state=1) 