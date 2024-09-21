import datetime
from bson import ObjectId

# Convert object IDs
async def convertObjectIds(obj):
    if isinstance(obj, dict):
        result = {}
        for k, v in obj.items():
            if isinstance(v, ObjectId):
                result[k] = str(v)
            elif isinstance(v, datetime.datetime):
                result[k] = v.isoformat()
            else:
                result[k] = await convertObjectIds(v)
        return result
    elif isinstance(obj, list):
        return [await convertObjectIds(i) for i in obj]
    else:
        return obj