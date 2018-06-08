import requests
import json

cnf_dat = config_data()

# Get the feed
r = requests.get(cnf_dat["api_endpoint"]+"/devices.php")
r.text

# Convert it to a Python dictionary
data = json.loads(r.text)

# Loop through the result.
for device in data['data']['devices']:

    print "ID: %s" % (device['id'])
    print "Title: %s" % (device['title']) 
    print "Category: %s" % (device['category'])
    print "Status: %s" % (device['status'])
    print "Status Code: %s" % (device['status_code'])
    print ""