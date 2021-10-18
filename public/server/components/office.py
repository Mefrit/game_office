import time
import json
class Module_office:
    def __init__(self,props):
        self.db = props["db"]
   
    def actionSave(self,data):
        try:
            cursor = self.db.cursor()
            result = {}
            query = """ SELECT COUNT(*) FROM office  WHERE id_office = %s """ % (data["id_office"])
            cursor.execute(query)
            office = cursor.fetchall()
            print("\n\n\n\\n\n\n\n\n\n\n\n !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n\n\n\n\n\n",office)
            if(office[0][0] == 0):
                users_data = [(data['id_office'], json.dumps(data['design']))]
                cursor.executemany("INSERT INTO office (id_office, design) VALUES ( ?,? ) ", users_data)
             
            else:
                query = """
                UPDATE office 
                SET design = '%s'
                WHERE id_office = %d 
                """ % ( json.dumps(data['design']), data['id_office'])
                print(query)     
                cursor.execute(query)
         
           
            self.db.commit()
            self.db.close()
            result["status"] = "ok"
            return result
        except:
            result = {}
            result["status"] = "fail"
            result["message"] = "Ошибка сохранении дизайна оффиса."
            return result
    def actionGet(self, data):
        try:
            cursor = self.db.cursor()

            query = """ SELECT design FROM office  WHERE id_office = %s """ % (data["id_office"])
            # query = """ SELECT * FROM office  WHERE id_office = 1 """
            print("\n\n\n")
            print(query)
            print("\n\n\n")
            cursor.execute(query)
            design = cursor.fetchall()
            print(design)
            print("\n\n\n")
            self.db.commit()
            self.db.close()
            result = {};
            result["status"] = "ok"
            result["design"] = design[0][0]
            return result
        except:
            result = {}
            result["status"] = "fail"
            result["message"] = "Ошибка при загрузке дизайна оффиса."
            return result
            
    def returnAction(self ,action, data):
        return getattr(self, "action" + action)( data)