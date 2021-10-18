import sqlite3
from public.server.components.registration import Module_registration  
from public.server.components.tools import Module_tools  
from public.server.components.dialog import Module_dialog 
from public.server.components.geoPosition import Module_GeoPosition
from public.server.components.deskBoard import Module_DeskBoard
from public.server.components.office import Module_office
# from public.server.components.
class Server :
    def __init__(self,path2db):
        self.db = sqlite3.connect(path2db)
   
    def getDB(self):
        return self.db
    @staticmethod
    def getModule(self, module_name):
        conf = {}
        conf["db"] = self.db
      
        if module_name == "registration":
            return Module_registration(conf)
        if module_name == "tools":
            return Module_tools(conf)
        if module_name == "dialog":
            return Module_dialog(conf)
        if module_name == "GeoPosition":
            return Module_GeoPosition(conf)
        if module_name == "DeskBoard":
            return Module_DeskBoard(conf)
        if module_name == "office":
            return Module_office(conf)

    def getAnswerFromComponent(self, conf):
        obj = self.getModule(self,conf["module"])
       
        
        return obj.returnAction(conf["action"],conf["data"])