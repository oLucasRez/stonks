#!/usr/bin/env R

require(rpart)
require(DBI)
require(RPostgres)
require(rpart.plot)
require(ipred)
require(caret)
require(plyr)
require(igraph)
require(rjson)

#}
# #connection
con = dbConnect(RPostgres::Postgres(),dbname = 'stonks_database',host = 'stonks-database.c8v7ftrxiwwr.us-east-1.rds.amazonaws.com',port = 5432,user = 'stonks',password = 'stonksmamadinha69420')


#Nos do Hype
Hfirst_release_date2 <- strsplit("01-03,01-04,01-11,01-12,01-14,01-16,01-17,01-18,01-19,01-21,01-22,01-23,01-24,01-25,01-26,01-27,01-28,01-29,01-30,02-01,02-03,02-04,02-05,02-06,02-07,02-08,02-12,02-13,02-14,02-15,02-17,02-18,02-19,02-20,02-21,02-22,02-23,02-24,02-25,02-26,02-27,02-28,03-02,03-03,03-04,03-05,03-06,03-09,03-10,03-12,03-13,03-14,03-16,03-18,03-20,03-21,03-22,03-23,03-24,03-25,03-26,03-27,03-28,03-29,03-30,03-31,04-01,04-02,04-03,04-04,04-05,04-06,04-07,04-08,04-09,04-10,04-11,04-12,04-13,04-14,04-16,04-17,04-18,04-19,04-20,04-22,04-23,04-24,04-26,04-27,04-29,04-30,05-01,05-02,05-03,05-04,05-05,05-07,05-08,05-09,05-11,05-12,05-13,05-14,05-15,05-16,05-17,05-19,05-21,05-22,05-23,05-24,05-25,05-26,05-27,05-28,05-29,05-30,05-31,06-02,06-03,06-04,06-05,06-06,06-09,06-11,06-12,06-13,06-14,06-16,06-17,06-19,06-20,06-21,06-22,06-23,06-24,06-26,06-27,06-28,06-29,06-30,07-01,07-04,07-06,07-09,07-11,07-12,07-13,07-14,07-15,07-16,07-18,07-19,07-21,07-23,07-24,07-25,07-26,07-27,07-28,07-29,07-30,07-31,08-01,08-03,08-06,08-07,08-09,08-10,08-12,08-13,08-14,08-15,08-16,08-17,08-19,08-20,08-21,08-22,08-23,08-24,08-25,08-26,08-27,08-28,08-29,08-30,08-31,09-02,09-03,09-04,09-06,09-07,09-08,09-09,09-10,09-11,09-12,09-13,09-14,09-15,09-16,09-17,09-18,09-19,09-20,09-21,09-22,09-24,09-25,09-26,09-27,09-28,09-29,09-30,10-01,10-02,10-03,10-04,10-05,10-06,10-07,10-08,10-09,10-10,10-12,10-13,10-14,10-15,10-16,10-17,10-18,10-19,10-20,10-21,10-22,10-23,10-24,10-25,10-26,10-27,10-28,10-29,10-31,11-01,11-03,11-04,11-05,11-06,11-07,11-08,11-09,11-10,11-12,11-13,11-14,11-15,11-16,11-17,11-18,11-19,11-20,11-21,11-23,11-24,11-26,11-28,11-29,11-30,12-01,12-02,12-03,12-04,12-05,12-06,12-08,12-10,12-11,12-12,12-13,12-14,12-15,12-16,12-19,12-24,12-30,12-31",",")
Hfirst_release_date2 <- as.vector(unlist(Hfirst_release_date2))

Hfirst_release_date4 <- strsplit("01-03,01-04,01-11,01-12,01-14,01-16,01-17,01-18,01-19,01-21,01-22,01-23,01-24,01-25,01-26,01-27,01-28,01-29,01-30,02-01,02-03,02-04,02-05,02-06,02-07,02-08,02-12,02-13,02-14,02-15,02-17,02-18,02-19,02-20,02-21,02-22,02-23,02-24,02-25,02-26,02-27,02-28,03-02,03-03,03-04,03-05,03-06,03-09,03-10,03-12,03-13,03-14,03-16,03-18,03-20,03-21,03-22,03-23,03-24,03-25,03-27,03-28,03-30,03-31,04-01,04-02,04-03,04-04,04-05,04-06,04-07,04-08,04-09,04-10,04-11,04-12,04-13,04-14,04-16,04-17,04-18,04-19,04-20,04-22,04-23,04-24,04-26,04-27,04-29,04-30,05-01,05-02,05-03,05-04,05-05,05-07,05-08,05-09,05-11,05-12,05-13,05-14,05-15,05-16,05-17,05-19,05-21,05-22,05-23,05-24,05-25,05-27,05-28,05-29,05-30,05-31,06-02,06-03,06-04,06-05,06-06,06-09,06-11,06-12,06-13,06-14,06-16,06-17,06-19,06-20,06-21,06-23,06-24,06-27,06-28,06-29,06-30,07-01,07-04,07-06,07-09,07-11,07-12,07-13,07-14,07-15,07-16,07-18,07-19,07-21,07-23,07-24,07-25,07-26,07-27,07-28,07-29,07-30,07-31,08-01,08-03,08-06,08-07,08-10,08-12,08-13,08-14,08-15,08-16,08-17,08-19,08-20,08-21,08-23,08-24,08-25,08-26,08-27,08-28,08-29,08-30,09-02,09-03,09-04,09-06,09-07,09-08,09-10,09-11,09-12,09-14,09-15,09-16,09-17,09-18,09-19,09-20,09-21,09-22,09-24,09-25,09-27,09-29,09-30,10-01,10-02,10-03,10-04,10-05,10-06,10-07,10-08,10-09,10-10,10-12,10-13,10-14,10-15,10-16,10-17,10-18,10-19,10-20,10-21,10-22,10-23,10-24,10-25,10-26,10-27,10-28,10-31,11-01,11-03,11-04,11-05,11-06,11-07,11-08,11-10,11-12,11-13,11-14,11-15,11-16,11-17,11-18,11-19,11-20,11-21,11-23,11-24,11-26,11-28,11-29,11-30,12-01,12-02,12-03,12-04,12-05,12-06,12-08,12-10,12-11,12-13,12-14,12-15,12-16,12-19,12-24,12-30,12-31",",")
Hfirst_release_date4 <- as.vector(unlist(Hfirst_release_date4))

Hengine_name8 <- strsplit("4A Engine,a000ff,Adobe AIR,ArenaNet Guild Wars,Asura,Aurora Engine,Babel engine,BigWorld,Black Desert Engine,Blam! Engine,Build,C++,C4 Engine,CANVAS Engine,CATHODE Engine,Clausewitz Engine,Clickteam Fusion,COBRA,Construct 2,construct 3,Corona SDK,CryEngine 3,CryEngine 5,Crystal Engine,Crystal Tools,Custom built engine,Cyber Dreams Engine,Dagon Engine,Defold,Diesel,Dragon Engine,Ego Engine,Essence Engine,Falling Everything Engine,FAME Tech,Firaxis LORE,FLEDGE Engine,Fox Engine,Game Maker,Game Maker Studio,GameMaker Studio 2,GameMaker: Studio,Genie Engine,Glacier,GlyphX,Godot,Havok Physics,Heaps.io,HPL Engine,id Tech 2,id Tech 4,id Tech 5,In-house engine,IW Engine,Jomini Engine,K2 Engine,KiriKiri,love2d,Microsoft XNA,Moai,MonoGame,NightShade Engine,Nvidia PhysX,Odyssey,OGRE,Orochi,Phoenix Engine (Wolfire),Phoenix VR,Prism3D,Prometheus In-Game Engine,Proprietary Engine,Ren'Py,Ren'Py Visual Novel Engine,RenderWare,renpy,Retox,Road Hog Engine,RPG Maker MV,RPG Maker XP,Sahara Engine (custom built),Serious Engine 4.0,Shooting Game Builder,SiglusEngine,Silk Engine,Source,Spark Casual Engine,Sparkle Engine,Stingray Engine,Stratagus,Telltale Tool,The Banner Saga Engine,The Madness Engine,Torque 3D,Trinigy Vision Engine,Turbulenz Engine,TW Engine 3,UbiArt Framework,Unigine,Unity,Unity 2017,Unity 2018,Unity 2019,Unity 4,Unity 5,Unity3D,Unreal Engine,Unreal Engine 3,Velocity Engine,Virtual Theatre,Visionaire,Visionaire Studio,VRAGE,VueJS,X-ray Engine,YU-RIS  Engine",",")
Hengine_name8 <- as.vector(unlist(Hengine_name8))

Hengine_name9 <- strsplit("Amazon Lumberyard,AnvilNext,Apex,C-Engine,Chrome Engine,Creation Engine,CryEngine,Disrupt,Dunia Engine,Firebird Engine,GameMaker,Genome,Glacier 2,Havok,HeroEngine,id Tech 6,Liquid Engine,LithTech,Northlight Engine,Onyx Engine,RAGE,RE Engine,ROMU,Snowdrop,Unreal Engine 4,Void Engine,Z-Engine",",")
Hengine_name9 <- as.vector(unlist(Hengine_name9))

Hfirst_release_date18 <- strsplit("01-16,01-24,01-26,02-12,02-13,02-14,02-17,02-21,02-22,02-27,03-03,03-06,03-10,03-18,03-20,03-23,03-25,03-27,03-28,03-31,04-02,04-03,04-04,04-06,04-07,04-22,04-23,04-24,04-27,04-29,04-30,05-03,05-04,05-07,05-12,05-13,05-14,05-16,05-17,05-19,05-22,05-27,05-28,06-03,06-04,06-05,06-06,06-09,06-11,06-13,06-14,06-29,07-06,07-09,07-11,07-12,07-15,07-18,07-26,07-27,07-30,08-07,08-10,08-13,08-14,08-17,08-19,08-20,08-21,08-26,08-28,08-29,08-30,09-03,09-07,09-08,09-12,09-14,09-16,09-17,09-18,09-22,09-24,09-27,09-29,10-04,10-06,10-07,10-09,10-12,10-15,10-16,10-17,10-18,10-22,10-26,10-27,10-28,11-07,11-10,11-13,11-14,11-17,11-18,11-21,11-26,11-30,12-03,12-04,12-14,12-19,12-30",",")
Hfirst_release_date18 <- as.vector(unlist(Hfirst_release_date18))

Hfirst_release_date19 <- strsplit("10-25",",")
Hfirst_release_date19 <- as.vector(unlist(Hfirst_release_date19))

Hfirst_release_date5 <- strsplit("03-26,03-29,05-26,06-22,06-26,08-09,08-22,08-31,09-09,09-13,09-26,09-28,10-29,11-09,12-12",",")
Hfirst_release_date5 <- as.vector(unlist(Hfirst_release_date5))

Hfirst_release_date3 <- strsplit("03-07,05-18,08-08,09-05,12-07,12-09",",")
Hfirst_release_date3 <- as.vector(unlist(Hfirst_release_date3))

Hprice6 <- strsplit("164.945",",")
Hprice6 <- as.vector(unlist(Hprice6))

Hengine_name12 <- strsplit("love2d,REDengine,Snowdrop,Unity,Unity 4,Unreal Engine,Visionaire Studio",",")
Hengine_name12 <- as.vector(unlist(Hengine_name12))

Hprice7 <- strsplit("164.945",",")
Hprice7 <- as.vector(unlist(Hprice7))

Hprice24 <- strsplit("47.99",",")
Hprice24 <- as.vector(unlist(Hprice24))

Hprice25 <- strsplit("47.99",",")
Hprice25 <- as.vector(unlist(Hprice25))

Hengine_name13 <- strsplit("Custom built engine,In House Engine",",")
Hengine_name13 <- as.vector(unlist(Hengine_name13))

#arvore std
setClass("Tree")

setClass("Empty", contains="Tree")

no <-setClass("no", contains="Tree",
              representation=representation(left="Tree", right="Tree",teste = "function",leaf = "numeric",value = "numeric",name = "character" ),
              prototype=prototype(left=new("Empty"), right=new("Empty"), teste=function(game){return(-2)} , value =-1))

#no das arvores de hype
HNo_8 <- no(
  leaf = 1,
  value = 4.273469,
  teste = function(game){
    if(is.na(game[1,6])){
      return(-1)
    }else{
      if(game[1,6] %in% Hengine_name8){
        return(1)
      }else{
        return(0)
      }
    }
  },
  name = "HNo_8")

HNo_18 <- no(
  leaf = 1,
  value = 20.87919,
  teste = function(game){
    if(is.na(game[1,3])){
      return(-1)
    }else{
      if(game[1,3] %in% Hfirst_release_date18){
        return(1)
      }else{
        return(0)
      }
    }
  },
  name = "HNo_18")

HNo_19 <- no(
  leaf = 1,
  value = 257,
  teste = function(game){
    if(is.na(game[1,3])){
      return(-1)
    }else{
      if(game[1,3] %in% Hfirst_release_date19){
        return(1)
      }else{
        return(0)
      }
    }
  },
  name = "HNo_19")

HNo_9 <- no(
  left = HNo_18,
  right = HNo_19,
  leaf = 0,
  teste = function(game){
    if(is.na(game[1,6])){
      return(-1)
    }else{
      if(game[1,6] %in% Hengine_name9){
        return(1)
      }else{
        return(0)
      }
    }
  },
  name = "HNo_9")

HNo_4 <- no(
  left = HNo_8,
  right = HNo_9,
  leaf = 0,
  teste = function(game){
    if(is.na(game[1,3])){
      return(-1)
    }else{
      if(game[1,3] %in% Hfirst_release_date4){
        return(1)
      }else{
        return(0)
      }
    }
  },
  name = "HNo_4")

HNo_5 <- no(
  leaf = 1,
  value = 54.72682,
  teste = function(game){
    if(is.na(game[1,3])){
      return(-1)
    }else{
      if(game[1,3] %in% Hfirst_release_date5){
        return(1)
      }else{
        return(0)
      }
    }
  },
  name = "HNo_5")

HNo_2 <- no(
  left = HNo_4,
  right = HNo_5,
  leaf = 0,
  teste = function(game){
    if(is.na(game[1,3])){
      return(-1)
    }else{
      if(game[1,3] %in% Hfirst_release_date2){
        return(1)
      }else{
        return(0)
      }
    }
  },
  name = "HNo_2")

HNo_24 <- no(
  leaf = 1,
  value = 1.675192,
  teste = function(game){
    if(is.na(game[1,5])){
      return(-1)
    }else{
      if(game[1,5] < as.numeric(Hprice24)){
        return(1)
      }else{
        return(0)
      }
    }
  },
  name = "HNo_24")

HNo_25 <- no(
  leaf = 1,
  value = 164.2549,
  teste = function(game){
    if(is.na(game[1,5])){
      return(-1)
    }else{
      if(game[1,5] >= as.numeric(Hprice25)){
        return(1)
      }else{
        return(0)
      }
    }
  },
  name = "HNo_25")

HNo_13 <- no(
  leaf = 1,
  value = 218.7502,
  teste = function(game){
    if(is.na(game[1,6])){
      return(-1)
    }else{
      if(game[1,6] %in% Hengine_name13){
        return(1)
      }else{
        return(0)
      }
    }
  },
  name = "HNo_13")

HNo_12 <- no(
  left = HNo_24,
  right = HNo_25,
  leaf = 0,
  teste = function(game){
    if(is.na(game[1,6])){
      return(-1)
    }else{
      if(game[1,6] %in% Hengine_name12){
        return(1)
      }else{
        return(0)
      }
    }
  },
  name = "HNo_12")

HNo_6 <- no(
  left = HNo_12,
  right = HNo_13,
  leaf = 0,
  teste = function(game){
    if(is.na(game[1,5])){
      return(-1)
    }else{
      if(game[1,5] < as.numeric(Hprice6)){
        return(1)
      }else{
        return(0)
      }
    }
  },
  name = "HNo_6")

HNo_7 <- no(
  leaf = 1,
  value = 1007,
  teste = function(game){
    if(is.na(game[1,5])){
      return(-1)
    }else{
      if(game[1,5] >= as.numeric(Hprice7)){
        return(1)
      }else{
        return(0)
      }
    }
  },
  name = "HNo_7")

HNo_3 <- no(
  left = HNo_6,
  right = HNo_7,
  leaf = 0,
  teste = function(game){
    if(is.na(game[1,3])){
      return(-1)
    }else{
      if(game[1,3] %in% Hfirst_release_date3){
        return(1)
      }else{
        return(0)
      }
    }
  },
  name = "HNo_3")

HNo_1 <- no(left = HNo_2, right = HNo_3, leaf = 0, name = "HNo_1")



#Nos do TOTAL RATING
TRfirst_release_date2 <- strsplit("01-01,01-02,01-07,01-10,01-11,01-12,01-15,01-16,01-19,01-21,01-22,01-23,01-24,01-27,01-28,01-31,02-01,02-02,02-09,02-10,02-11,02-12,02-13,02-15,02-19,02-21,02-23,02-24,02-26,02-27,02-28,03-08,03-09,03-11,03-13,03-16,03-18,03-21,03-23,03-24,03-25,03-27,03-28,03-31,04-01,04-02,04-03,04-05,04-06,04-07,04-08,04-10,04-11,04-12,04-14,04-15,04-16,04-19,04-20,04-21,04-25,05-01,05-02,05-03,05-05,05-06,05-07,05-08,05-09,05-10,05-15,05-16,05-20,05-21,05-22,05-27,05-29,05-30,06-02,06-03,06-04,06-05,06-06,06-07,06-09,06-11,06-12,06-13,06-14,06-15,06-16,06-19,06-20,06-23,06-26,06-27,06-30,07-01,07-03,07-06,07-07,07-08,07-09,07-10,07-11,07-13,07-15,07-16,07-18,07-20,07-21,07-25,07-28,07-30,07-31,08-01,08-03,08-04,08-05,08-08,08-09,08-11,08-12,08-13,08-14,08-15,08-16,08-17,08-26,08-27,08-28,09-02,09-04,09-06,09-09,09-10,09-12,09-15,09-19,09-22,09-23,09-25,09-26,10-01,10-02,10-03,10-07,10-11,10-12,10-15,10-17,10-29,10-30,11-02,11-06,11-20,11-21,11-22,11-23,11-25,12-02,12-03,12-07,12-09,12-11,12-12,12-13,12-14,12-17,12-18,12-20,12-21,12-24,12-25,12-28,12-29,12-30",",")
TRfirst_release_date2 <- as.vector(unlist(TRfirst_release_date2))
TRfirst_release_date4 <- strsplit("01-02,01-15,02-11,02-13,02-19,02-23,02-26,02-28,03-08,03-09,03-11,03-31,04-02,04-07,04-08,04-15,04-21,05-03,05-05,05-09,05-15,05-16,05-22,06-09,06-12,06-16,06-20,07-01,07-03,07-07,07-09,07-18,07-20,07-30,08-04,08-09,08-14,09-23,10-07,11-06,11-22,11-23,11-25,12-07,12-09,12-12,12-17,12-21,12-24,12-29",",")
TRfirst_release_date4 <- as.vector(unlist(TRfirst_release_date4))
TRengine_name8 <- strsplit("Asura,Build,Chrome Engine,Construct 2,CryEngine,Dx Studio,Enfusion,Fox Engine,GEM,Havok Physics,Icarus Platform,id Tech 2,id Tech 4,Intelligent Stupidity,K2 Engine,libgdx,MonoGame,Multimedia Fusion,NightShade Engine,Real Virtuality 3,RPG Maker,Silk Engine,Source,Spenefett,TheEngine,Torque 2D,Torque Game Engine,Twine,Unity,Unity 4,Unreal Engine,Unreal Engine 3,Vision,Whale 2,Wintermute Engine",",")
TRengine_name8 <-  as.vector(unlist(TRengine_name8))
TRengine_name16 <- strsplit("Fox Engine,K2 Engine,NightShade Engine,Real Virtuality 3,TheEngine,Twine,Vision",",")
TRengine_name16 <-  as.vector(unlist(TRengine_name16))
TRengine_name17 <- strsplit("sura,Build,Chrome Engine,Construct 2,CryEngine,Dx Studio,Enfusion,GEM,Havok Physics,Icarus Platform,id Tech 2,id Tech 4,Intelligent Stupidity,libgdx,MonoGame,Multimedia Fusion,RPG Maker,Silk Engine,Source,Spenefett,Torque 2D,Torque Game Engine,Unity,Unity 4,Unreal Engine,Unreal Engine 3,Whale 2,Wintermute Engine",",")
TRengine_name17 <-  as.vector(unlist(TRengine_name17))
TRengine_name9 <- strsplit("Adobe Flash Player,Adventure Game Studio,AnvilNext,Construct,Custom built engine,Despair,Diesel,Essence Engine,Game Maker,Gamebryo,GameMaker Studio 2,GameMaker: Studio,HPL,In-house engine,KiriKiri,Microsoft XNA,PhyreEngine,Proprietary Engine,RE Engine,rUGP,Silent Storm Engine,Sith,Unity 2018,Unity 5,Unity3D,Unreal Engine 4,Visionaire,YU-RIS  Engine,Z-Engine",",")
TRengine_name9 <-  as.vector(unlist(TRengine_name9))
TRfirst_release_date5 <- strsplit("01-01,01-07,01-10,01-11,01-12,01-16,01-19,01-21,01-22,01-23,01-24,01-27,01-28,01-31,02-01,02-02,02-09,02-10,02-12,02-15,02-21,02-24,02-27,03-13,03-16,03-18,03-21,03-23,03-24,03-25,03-27,03-28,04-01,04-03,04-05,04-06,04-10,04-11,04-12,04-14,04-16,04-19,04-20,04-25,05-01,05-02,05-06,05-07,05-08,05-10,05-20,05-21,05-27,05-29,05-30,06-02,06-03,06-04,06-05,06-06,06-07,06-11,06-13,06-14,06-15,06-19,06-23,06-26,06-27,06-30,07-06,07-08,07-10,07-11,07-13,07-15,07-16,07-21,07-25,07-28,07-31,08-01,08-03,08-05,08-08,08-11,08-12,08-13,08-15,08-16,08-17,08-26,08-27,08-28,09-02,09-04,09-06,09-09,09-10,09-12,09-15,09-19,09-22,09-25,09-26,10-01,10-02,10-03,10-11,10-12,10-15,10-17,10-29,10-30,11-02,11-20,11-21,12-02,12-03,12-11,12-13,12-14,12-18,12-20,12-25,12-28,12-30",",")
TRfirst_release_date5 <- as.vector(unlist(TRfirst_release_date5))
TRengine_name10 <- strsplit("Adobe AIR,Alien Shooter Engine,Apex,Argon,Asura,BGI/Ethornell,Black Desert Engine,Blender Game Engine,Chrome Engine,Construct 2,Corona SDK,Cougar Adventure Engine,createjs,CryEngine,CryEngine 5,Cryptic Engine,Crystal Engine,Crystal Space,Crystal Tools,Custom built engine,Cyber Dreams Engine,Dagor Engine,DarkBASIC Pro,Diesel,Earth-4,Ecstasy Engine,EDuke 32,flash,Flashpunk,FlatRedBall,Flixel,Frostbite,FXEngine,Game Maker Studio,GameMaker Studio 2,Geo-Mod,Glacier,Havok,HeroEngine,HPL,HPL Engine,id Tech 1,Infernal Engine,Inform,KiriKiri,KT Engine,Lightweight Java Game Library,LithTech,LyN,Marmoset,Mercury Steam Engine,Microsoft XNA,MT Framework,Multimedia Applications Development Environment,Nebula Device,NeL,NightShade Engine,Nod Engine,Nvidia PhysX,Offset Engine,Phoenix Engine (Wolfire),Phoenix VR,PhyreEngine,PhysX,Plasma,Playground SDK,Prometheus In-Game Engine,Proprietary Engine,Real Live,Ren'Py Visual Novel Engine,RENA,RenderWare,Retox,Ronin,RPG Maker MV,SCI,Serious Engine,Shark 3D,Sierra's Creative Interpreter,SiglusEngine,Silk Engine,Simple and Fast Multimedia Library,Source,Spark Casual Engine,SpeedTree,SRPG Studio,Stingray Engine,Stratagus,Telltale Tool,Terrabuilder,The Banner Saga Engine,The Sims 3 Engine,Torque 3D,Turbulenz Engine,Unity,Unity 2017,Unity 2018,Unity 4,Unity3D,Unreal Engine,Unreal Engine 2,Unreal Engine 2.5,Unreal Engine 3,Unreal Engine 4,Velocity Engine,Vision,Vision Engine,VRAGE,Wintermute Engine,Wolf RPG Editor,Xed,YU-RIS  Engine,ZEN",",")
TRengine_name10 <-  as.vector(unlist(TRengine_name10))
TRengine_name11 <- strsplit("a000ff,Adobe Flash Player,Adventure Game Studio,AGI,Aurora Engine,Blazing Renderer,Box2D,Clausewitz Engine,Clickteam Fusion,Cocos2d-x,Eclipse Engine,Ego Engine,Evolution,ExHibit,Game Maker,Gamebryo,GameMaker,GameMaker: Studio,Genome,Gex engine,GlyphX,GoldSrc,Havok Physics,Ice-Peak Engine,id Tech 2,id Tech 3,id Tech 4,id Tech 5,In-house engine,Infinity Engine,Jade,Jedi,KEX,libGDX,LS3D,MEGA Engine,Moai,Multimedia Fusion,N2System,Northlight Engine,Ner,NVLMaker,Odyssey,OEngine,OGRE,Prism3D,RE Engine,REDengine,Road Hog Engine,ROMU,RPG Maker,RPG Maker VX Ace,RPG Maker XP,SAGA,SCUMM,Snowdrop,Sprint,System4,TDRPG Engine,TheEngine,Traktor,Trinigy Vision Engine,Unity 2019,Unity 5,Virtools Engine,Visionaire,Voxel Space,X-ray Engine,XNA Game Studio,Zero",",")
TRengine_name11 <-  as.vector(unlist(TRengine_name11))
TRfirst_release_date20 <- strsplit("01-07,01-11,01-12,01-28,02-01,02-02,02-12,03-16,03-18,03-21,03-25,03-28,04-03,04-10,04-11,04-12,04-14,04-19,04-25,05-01,05-02,05-06,05-08,05-27,05-30,06-02,06-04,06-05,06-06,06-11,06-23,06-26,06-27,06-30,07-08,07-16,07-28,07-31,08-05,08-11,08-15,08-17,09-15,09-19,09-22,10-01,10-11,10-12,10-29,10-30,11-02,11-20,12-02,12-11,12-13,12-18,12-30",",")
TRfirst_release_date20 <- as.vector(unlist(TRfirst_release_date20))
TRfirst_release_date21 <- strsplit("01-01,01-10,01-16,01-19,01-21,01-22,01-23,01-24,01-27,01-31,02-09,02-15,02-21,02-24,02-27,03-13,03-23,03-24,03-27,04-01,04-06,04-16,04-20,05-07,05-10,05-20,05-21,05-29,06-03,06-07,06-13,06-14,06-15,06-19,07-06,07-10,07-11,07-13,07-15,07-21,07-25,08-01,08-03,08-08,08-12,08-13,08-16,08-26,08-27,08-28,09-02,09-04,09-06,09-09,09-10,09-12,09-25,09-26,10-02,10-03,10-15,10-17,11-21,12-03,12-14,12-20,12-25,12-28",",")
TRfirst_release_date21 <- as.vector(unlist(TRfirst_release_date21))
TRfirst_release_date3 <- strsplit("01-04,01-08,01-09,01-13,01-14,01-17,01-18,01-20,01-25,01-26,01-29,01-30,02-03,02-04,02-05,02-06,02-07,02-08,02-14,02-16,02-17,02-18,02-20,02-22,02-25,02-29,03-01,03-02,03-03,03-04,03-05,03-06,03-07,03-10,03-12,03-14,03-15,03-17,03-19,03-20,03-22,03-26,03-29,03-30,04-04,04-09,04-17,04-18,04-22,04-23,04-24,04-26,04-27,04-28,04-29,04-30,05-04,05-11,05-12,05-13,05-14,05-17,05-18,05-19,05-23,05-24,05-25,05-26,05-28,05-31,06-01,06-08,06-17,06-18,06-21,06-22,06-24,06-25,06-28,06-29,07-02,07-04,07-05,07-12,07-14,07-17,07-19,07-22,07-23,07-24,07-26,07-27,07-29,08-02,08-06,08-07,08-10,08-18,08-19,08-20,08-21,08-22,08-23,08-24,08-25,08-29,08-30,08-31,09-01,09-03,09-05,09-07,09-08,09-11,09-13,09-14,09-16,09-17,09-18,09-20,09-21,09-24,09-27,09-28,09-29,09-30,10-04,10-05,10-06,10-08,10-09,10-10,10-13,10-14,10-16,10-18,10-19,10-20,10-21,10-22,10-23,10-24,10-25,10-26,10-27,10-28,10-31,11-01,11-03,11-04,11-05,11-07,11-08,11-09,11-10,11-11,11-12,11-13,11-14,11-15,11-16,11-17,11-18,11-19,11-24,11-26,11-27,11-28,11-29,11-30,12-01,12-04,12-05,12-06,12-08,12-10,12-15,12-16,12-19,12-22,12-23,12-31",",")
TRfirst_release_date3 <- as.vector(unlist(TRfirst_release_date3))
TRengine_name6 <- strsplit("AbbeyCore,Adobe AIR,AEGIS,Amityville,Anvil,AnvilNext,Apex,Asura,Asura engine,Atrophy,Avalanche engine,Babel engine,BGI/Ethornell,BigWorld,Black Sun Engine,Build,C++,C4 Engine,CatSystem2,Choice,Chrome Engine,Clausewitz Engine,Clickteam Fusion,CloakNT,COBRA,Construct,Construct 2,Corona SDK,Cougar Adventure Engine,CPAL3D Engine,createjs,CryEngine,Crystal Tools,Dagor Engine,Dark Alliance Engine,Dawn Engine,Defold,Descent Engine,Diesel,Disrupt,Distortion Tools,Divinity Engine,DreamWorld,E-mote,E.V.I.L Engine,Ego Engine,Emmersion,Enforce,Enigma engine,Essence Engine,Evolution Engine,FAME Tech,Fighter Maker,FLEDGE Engine,Forgelight Engine,fps creator classic,Game Maker Studio,Gamebook Adventures Engine,GameMaker,GameMaker Studio 2,GameMaker: Studio,GEM,Genome,Geo-Mod,Geo-Mod 2.0,Gepard 3D engine,Gideros,Glacier,Glacier 2,Godot,GoldSrc,Groovie,Havok,Heaps.io,HPL,HydroEngine,IceWave,id Tech 3,id Tech 5,In-house engine,In House Engine,Infernal Engine,isiMotor,IW Engine,jMonkeyEngine,Jomini Engine,KiriKiri,KRASS Engine,Lightweight Java Game Library,LithTech,LithTech Jupiter EX,Lithtech Triton,LyN,MAX-FX,MonoGame,MT Framework,Multimedia Fusion,Nebula Device,NekoSDK,Northlight Engine,NoviceX,Nvidia PhysX,OGRE,Orion Engine,Orochi,Phoenix Engine (Relic),Phoenix VR,PhyreEngine,PhysX,Plasma,Quicksilver X,Real Virtuality,Real Virtuality 3,Real Virtuality 4,Ren'Py,RENA,Road Hog Engine,RPG Maker,RPG Maker MV,RSPiX,rUGP,SAGE,Sahara Engine (custom built),SCI0,Scimitar,Serious Engine,Serious Engine 3.5,Serious Engine 4.0,Siglus,Silent Storm Engine,Silk Engine,Snowdrop,Soft Engine,Source 2,Spark Casual Engine,Sparkle Engine,Sparta 3D,Starlight,stencyl,Stingray Engine,Sunshine Engine,SurRender 3D,Taito Type X,Telltale Tool,The Illusion Engine,TheEngine,Titanium,Torque 3D,Torque Game Engine,Unigine,Unity,Unity 2017,Unity 2018,Unity 2019,Unity 4,Unity 5,Unity3D,unreal 4,Unreal Engine,Unreal Engine 2,Unreal Engine 2.5,Unreal Engine 3,Unreal Engine 4,Virtools Engine,Virtual Dream,Virtual Theatre,Virtual World Inventor,Vision,Visionaire,Visual Novel Maker,Voxel Space,VueJS,Wolfenstein 3D,Wolfenstein 3D Engine,X-ray Engine,X Engine,X3 Reality,XNA Game Studio,YU-RIS  Engine,Z-Engine,Zod Engine",",")
TRengine_name6 <-  as.vector(unlist(TRengine_name6))
TRfirst_release_date12 <- strsplit("01-09,01-13,01-17,01-18,01-26,01-29,02-03,02-05,02-06,02-07,02-18,02-20,02-22,03-01,03-02,03-03,03-04,03-05,03-06,03-07,03-10,03-14,03-15,03-22,03-26,03-29,04-04,04-17,04-18,04-23,04-27,04-29,04-30,05-04,05-12,05-13,05-14,05-17,05-18,05-25,05-28,05-31,06-01,06-08,06-21,06-24,07-04,07-12,07-14,07-17,07-19,07-22,07-24,07-26,07-29,08-02,08-07,08-19,08-21,08-23,08-24,08-25,08-29,08-30,08-31,09-07,09-11,09-14,09-16,09-20,09-21,09-24,09-27,09-29,09-30,10-05,10-06,10-09,10-10,10-13,10-14,10-18,10-19,10-20,10-21,10-22,10-23,10-24,10-25,10-26,10-27,11-03,11-09,11-10,11-11,11-14,11-17,11-18,11-19,11-26,11-27,11-29,12-01,12-04,12-08,12-10,12-19,12-22,12-31",",")
TRfirst_release_date12 <- as.vector(unlist(TRfirst_release_date12))
TRengine_name24 <- strsplit("Adobe AIR,AnvilNext,Apex,Asura,Asura engine,Babel engine,C++,C4 Engine,Choice,Clausewitz Engine,Clickteam Fusion,CloakNT,Construct 2,Corona SDK,createjs,CryEngine,Dark Alliance Engine,Distortion Tools,E-mote,Emmersion,Enforce,Enigma engine,FLEDGE Engine,Game Maker Studio,GEM,Gepard 3D engine,Gideros,Godot,Groovie,IceWave,Infernal Engine,KiriKiri,Multimedia Fusion,NekoSDK,NoviceX,Orochi,Phoenix VR,PhyreEngine,PhysX,Real Virtuality,Ren'Py,Road Hog Engine,RPG Maker MV,RSPiX,rUGP,Silent Storm Engine,Silk Engine,Source 2,stencyl,Torque 3D,Unity,Unity 2017,Unity 2018,Unity 4,Unity3D,unreal 4,Unreal Engine,Unreal Engine 3,Unreal Engine 4,Virtual Dream,Virtual Theatre,Virtual World Inventor,Visionaire,Visual Novel Maker,Voxel Space,VueJS,Wolfenstein 3D,Wolfenstein 3D Engine,X Engine,X3 Reality",",")
TRengine_name24 <-  as.vector(unlist(TRengine_name24))
TRfirst_release_date48 <- strsplit("03-04,03-05,04-27,05-18,05-31,07-17,08-02,08-07,08-19,08-21,08-25,10-05,10-09,10-25,11-11,11-14,11-26,11-27,11-29,12-10",",")
TRfirst_release_date48 <- as.vector(unlist(TRfirst_release_date48))
TRfirst_release_date49 <- strsplit("01-13,01-17,01-18,01-29,02-03,02-05,02-06,02-07,02-18,02-20,02-22,03-01,03-02,03-03,03-06,03-07,03-10,03-14,03-22,03-26,03-29,04-04,04-17,04-18,04-23,04-29,04-30,05-04,05-12,05-13,05-14,05-17,05-25,05-28,06-08,06-21,06-24,07-04,07-12,07-14,07-19,07-22,07-24,07-26,07-29,08-23,08-24,08-29,08-30,08-31,09-07,09-11,09-14,09-16,09-20,09-21,09-24,09-27,09-29,09-30,10-06,10-10,10-13,10-14,10-18,10-19,10-20,10-21,10-22,10-23,10-24,10-26,10-27,11-03,11-09,11-10,11-17,11-18,11-19,12-01,12-04,12-08,12-19,12-31",",")
TRfirst_release_date49 <- as.vector(unlist(TRfirst_release_date49))
TRengine_name25 <- strsplit("AEGIS,Amityville,Anvil,Avalanche engine,BGI/Ethornell,BigWorld,Build,CatSystem2,Chrome Engine,Defold,Disrupt,Ego Engine,Essence Engine,Evolution Engine,Forgelight Engine,Gamebook Adventures Engine,GameMaker,GameMaker Studio 2,GameMaker: Studio,Geo-Mod,Glacier,Glacier 2,GoldSrc,Havok,Heaps.io,HPL,id Tech 3,id Tech 5,In-house engine,isiMotor,IW Engine,jMonkeyEngine,LithTech,Lithtech Triton,LyN,MAX-FX,MT Framework,Nebula Device,Northlight Engine,OGRE,Phoenix Engine (Relic),Plasma,Real Virtuality 4,RPG Maker,SAGE,Sahara Engine (custom built),Scimitar,Serious Engine,Serious Engine 4.0,Snowdrop,Spark Casual Engine,Starlight,Stingray Engine,Sunshine Engine,SurRender 3D,Taito Type X,Telltale Tool,The Illusion Engine,TheEngine,Titanium,Unity 5,Unreal Engine 2,Virtools Engine,Vision,X-ray Engine,XNA Game Studio,YU-RIS  Engine",",")
TRengine_name25 <-  as.vector(unlist(TRengine_name25))
TRfirst_release_date13 <- strsplit("01-04,01-14,01-20,01-25,01-30,02-04,02-08,02-14,02-16,02-17,02-25,02-29,03-12,03-17,03-19,03-20,03-30,04-09,04-22,04-24,04-26,04-28,05-11,05-19,05-24,05-26,06-17,06-22,06-25,06-28,06-29,07-02,07-23,07-27,08-06,08-10,08-18,08-20,08-22,09-01,09-03,09-05,09-08,09-13,09-17,09-18,09-28,10-04,10-08,10-16,10-28,10-31,11-01,11-04,11-05,11-07,11-08,11-12,11-13,11-15,11-16,11-24,11-28,11-30,12-05,12-06,12-15,12-16",",")
TRfirst_release_date13 <- as.vector(unlist(TRfirst_release_date13))
TRengine_name26 <- strsplit("Construct,Cougar Adventure Engine,CPAL3D Engine,Dagor Engine,Dark Alliance Engine,Divinity Engine,E.V.I.L Engine,Essence Engine,FAME Tech,Fighter Maker,fps creator classic,Game Maker Studio,GameMaker,Genome,HydroEngine,Jomini Engine,OGRE,Orion Engine,PhysX,Real Virtuality 3,Ren'Py,RENA,SCI0,Siglus,Silent Storm Engine,TheEngine,Torque Game Engine,Unity 2017,Unity 2018,Unity 5,YU-RIS  Engine",",")
TRengine_name26 <-  as.vector(unlist(TRengine_name26))
TRengine_name27 <- strsplit("AbbeyCore,Amityville,AnvilNext,Atrophy,Black Sun Engine,CatSystem2,Chrome Engine,Clickteam Fusion,COBRA,CryEngine,Crystal Tools,Dawn Engine,Descent Engine,Diesel,Disrupt,DreamWorld,Ego Engine,GameMaker: Studio,GEM,Geo-Mod 2.0,GoldSrc,Havok,Heaps.io,id Tech 3,id Tech 5,In-house engine,In House Engine,IW Engine,KRASS Engine,Lightweight Java Game Library,LithTech,LithTech Jupiter EX,MonoGame,MT Framework,Nvidia PhysX,Phoenix Engine (Relic),PhyreEngine,Quicksilver X,RPG Maker,Scimitar,Serious Engine 3.5,Snowdrop,Soft Engine,Spark Casual Engine,Sparkle Engine,Sparta 3D,Telltale Tool,Unigine,Unity,Unity 2019,Unity 4,Unreal Engine,Unreal Engine 2,Unreal Engine 2.5,Unreal Engine 3,Unreal Engine 4,Visionaire,X-ray Engine,Z-Engine,Zod Engine",",")
TRengine_name27 <-  as.vector(unlist(TRengine_name27))
TRengine_name7 <- strsplit("4A Engine,A-Life,A.L.I.V.E.,Adobe Flash Player,Adventure Game Studio,ALIVE,ArenaNet Guild Wars,Asylum,Beard+Razor,Blam! Engine,CANVAS Engine,CATHODE Engine,Chameleon,Creation Engine,CryEngine 3,Crystal Engine,Custom built engine,Dark Engine,Dragon Engine,Dunia Engine,Eclipse Engine,Falling Everything Engine,Firaxis LORE,Firebird Engine,Foundation Engine,Fox Engine,Frostbite,Game Maker,Gamebryo,Genie Engine,Godfather engine,Havok Physics,HPL Engine,id Tech 1,id Tech 2,id Tech 4,id Tech 6,iMUSE,Jade,Liquid Engine,Microsoft XNA,Moai,MonkeyX,NetImmerse,Odyssey,Omen Engine,Onyx Engine,OpenFL,OpenGL,Proprietary Engine,Quest,RAGE,Real Live,REDengine,Ren'Py Visual Novel Engine,RenderWare,RPG Maker VX Ace,SCUMM,Serious Engine 4,Sierra's Creative Interpreter,Sith,Source,The Alan Wake Engine,The Madness Engine,The Sims 3 Engine,Torque 2D,Turbine G3,TW Engine 2,TW Engine 3,UbiArt Framework,Void Engine,ZenGin",",")
TRengine_name7 <-  as.vector(unlist(TRengine_name7))
TRfirst_release_date14 <- strsplit("01-08,01-14,01-18,01-25,02-03,02-07,02-14,02-16,02-22,03-01,03-02,03-03,03-04,03-06,03-14,03-15,03-17,03-22,03-26,03-30,04-17,04-24,04-27,04-28,04-30,05-04,05-11,05-13,05-14,05-25,05-28,06-01,06-17,06-18,06-21,06-24,06-29,07-04,07-05,07-12,07-17,07-23,07-24,07-26,07-29,08-02,08-06,08-19,08-20,08-21,08-23,08-25,08-30,09-01,09-03,09-07,09-13,09-14,09-21,09-24,09-27,09-29,09-30,10-05,10-06,10-08,10-09,10-14,10-16,10-18,10-20,10-23,10-24,10-27,10-31,11-09,11-12,11-13,11-15,11-16,11-17,11-26,11-29,12-04,12-08,12-22,12-23",",")
TRfirst_release_date14 <- as.vector(unlist(TRfirst_release_date14))
TRfirst_release_date15 <- strsplit("02-25,03-05,03-19,03-20,04-18,04-23,04-29,05-12,05-18,05-23,05-31,07-14,07-19,08-07,08-10,08-24,08-29,08-31,09-11,09-16,09-18,09-20,10-04,10-13,10-21,10-25,10-26,11-03,11-10,11-14,11-18,11-27,11-28,11-30,12-05,12-06,12-10,12-31",",")
TRfirst_release_date15 <- as.vector(unlist(TRfirst_release_date15))

TRNo_16 <- no(
  leaf = 1,
  value = 36.78702,
  teste = function(game){
    if(is.na(game[1,6])){
      return(-1)
    }else{
      if(game[1,6] %in% TRengine_name16){
        return(1)
      }else{
        return(0)
      }
    }
  },
  name = "TRNo_16")

TRNo_17 <- no(
  leaf = 1,
  value = 56.22670,
  teste = function(game){
    if(is.na(game[1,6])){
      return(-1)
    }else{
      if(game[1,6] %in% TRengine_name17){
        return(1)
      }else{
        return(0)
      }
    }
  },
  name = "TRNo_17")


TRNo_8 <- no(
  left = TRNo_16,
  right = TRNo_17,
  leaf = 0,
  teste = function(game){
    if(is.na(game[1,6])){
      return(-1)
    }else{
      if(game[1,6] %in% TRengine_name8){
        return(1)
      }else{
        return(0)
      }
    }
  },
  name = "TRNo_8")


TRNo_9 <- no(
  leaf = 1,
  value = 76.28596,
  teste = function(game){
    if(is.na(game[1,6])){
      return(-1)
    }else{
      if(game[1,6] %in% TRengine_name9){
        return(1)
      }else{
        return(0)
      }
    }
  },
  name = "TRNo_9")



TRNo_4 <- no(
  left = TRNo_8,
  right = TRNo_9,
  leaf = 0,
  teste = function(game){
    if(is.na(game[1,3])){
      return(-1)
    }else{
      if(game[1,3] %in% TRfirst_release_date4){
        return(1)
      }else{
        return(0)
      }
    }
  },
  name = "TRNo_4")

TRNo_20 <- no(
  leaf = 1,
  value = 65.20927,
  teste = function(game){
    if(is.na(game[1,3])){
      return(-1)
    }else{
      if(game[1,3] %in% TRfirst_release_date20){
        return(1)
      }else{
        return(0)
      }
    }
  },
  name = "TRNo_20")

TRNo_21 <- no(
  leaf = 1,
  value = 71.00756,
  teste = function(game){
    if(is.na(game[1,3])){
      return(-1)
    }else{
      if(game[1,3] %in% TRfirst_release_date21){
        return(1)
      }else{
        return(0)
      }
    }
  },
  name = "TRNo_21")


TRNo_10 <- no(
  left = TRNo_20,
  right = TRNo_21,
  leaf = 0,
  teste = function(game){
    if(is.na(game[1,6])){
      return(-1)
    }else{
      if(game[1,6] %in% TRengine_name10){
        return(1)
      }else{
        return(0)
      }
    }
  },
  name = "TRNo_10")

TRNo_11 <- no(
  leaf = 1,
  value = 77.25109,
  teste = function(game){
    if(is.na(game[1,6])){
      return(-1)
    }else{
      if(game[1,6] %in% TRengine_name11){
        return(1)
      }else{
        return(0)
      }
    }
  },
  name = "TRNo_11")



TRNo_5 <- no(
  left = TRNo_10,
  right = TRNo_11,
  leaf = 0,
  teste = function(game){
    if(is.na(game[1,3])){
      return(-1)
    }else{
      if(game[1,3] %in% TRfirst_release_date5){
        return(1)
      }else{
        return(0)
      }
    }
  },
  name = "TRNo_5")

TRNo_2 <- no(
  left = TRNo_4,
  right = TRNo_5,
  leaf = 0,
  teste = function(game){
    if(is.na(game[1,3])){
      return(-1)
    }else{
      if(game[1,3] %in% TRfirst_release_date2){
        return(1)
      }else{
        return(0)
      }
    }
  },
  name = "TRNo_2")

TRNo_49 <- no(
  leaf = 1,
  value = 72.03113,
  teste = function(game){
    if(is.na(game[1,3])){
      return(-1)
    }else{
      if(game[1,3] %in% TRfirst_release_date49){
        return(1)
      }else{
        return(0)
      }
    }
  },
  name = "TRNo_49")

TRNo_48 <- no(
  leaf = 1,
  value = 57.33266,
  teste = function(game){
    if(is.na(game[1,3])){
      return(-1)
    }else{
      if(game[1,3] %in% TRfirst_release_date48){
        return(1)
      }else{
        return(0)
      }
    }
  },
  name = "TRNo_48")

TRNo_24 <- no(
  left = TRNo_48,
  right = TRNo_49,
  leaf = 0,
  teste = function(game){
    if(is.na(game[1,6])){
      return(-1)
    }else{
      if(game[1,6] %in% TRengine_name24){
        return(1)
      }else{
        return(0)
      }
    }
  },
  name = "TRNo_24")


TRNo_25 <- no(
  leaf = 1,
  value = 77.17869,
  teste = function(game){
    if(is.na(game[1,6])){
      return(-1)
    }else{
      if(game[1,6] %in% TRengine_name25){
        return(1)
      }else{
        return(0)
      }
    }
  },
  name = "TRNo_25")


TRNo_12 <- no(
  left = TRNo_24,
  right = TRNo_25,
  leaf = 0,
  teste = function(game){
    if(is.na(game[1,3])){
      return(-1)
    }else{
      if(game[1,3] %in% TRfirst_release_date12){
        return(1)
      }else{
        return(0)
      }
    }
  },
  name = "TRNo_12")


TRNo_27 <- no(
  leaf = 1,
  value = 80.57761,
  teste = function(game){
    if(is.na(game[1,6])){
      return(-1)
    }else{
      if(game[1,6] %in% TRengine_name26){
        return(1)
      }else{
        return(0)
      }
    }
  },
  name = "TRNo_27")

TRNo_26 <- no(
  leaf = 1,
  value = 63.36403,
  teste = function(game){
    if(is.na(game[1,6])){
      return(-1)
    }else{
      if(game[1,6] %in% TRengine_name26){
        return(1)
      }else{
        return(0)
      }
    }
  },
  name = "TRNo_26")


TRNo_13 <- no(
  left = TRNo_26,
  right = TRNo_27,
  leaf = 0,
  teste = function(game){
    if(is.na(game[1,3])){
      return(-1)
    }else{
      if(game[1,3] %in% TRfirst_release_date13){
        return(1)
      }else{
        return(0)
      }
    }
  },
  name = "TRNo_13")

TRNo_6 <- no(
  left = TRNo_12,
  right = TRNo_13,
  leaf = 0,
  teste = function(game){
    if(is.na(game[1,6])){
      return(-1)
    }else{
      if(game[1,6] %in% TRengine_name6){
        return(1)
      }else{
        return(0)
      }
    }
  },
  name = "TRNo_6")


TRNo_15 <- no(
  leaf = 1,
  value = 90.12769,
  teste = function(game){
    if(is.na(game[1,3])){
      return(-1)
    }else{
      if(game[1,3] %in% TRfirst_release_date15){
        return(1)
      }else{
        return(0)
      }
    }
  },
  name = "TRNo_15")

TRNo_14 <- no(
  leaf = 1,
  value = 81.98383,
  teste = function(game){
    if(is.na(game[1,3])){
      return(-1)
    }else{
      if(game[1,3] %in% TRfirst_release_date14){
        return(1)
      }else{
        return(0)
      }
    }
  },
  name = "TRNo_14")


TRNo_7 <- no(
  left = TRNo_14,
  right = TRNo_15,
  leaf = 0,
  teste = function(game){
    if(is.na(game[1,6])){
      return(-1)
    }else{
      if(game[1,6] %in% TRengine_name7){
        return(1)
      }else{
        return(0)
      }
    }
  },
  name = "TRNo_7")

TRNo_3 <- no(
  left = TRNo_6,
  right = TRNo_7,
  leaf = 0,
  teste = function(game){
    if(is.na(game[1,3])){
      return(-1)
    }else{
      if(game[1,3] %in% TRfirst_release_date3){
        return(1)
      }else{
        return(0)
      }
    }
  },
  name = "TRNo_3")


TRNo_1 <- no(left = TRNo_2, right = TRNo_3, leaf = 0, name = "TRNo_1")


#Nos do Follows
Fengine_name2 <- strsplit("3D Game Studio,4A Engine,A-Life,A.L.I.V.E.,a000ff,AbbeyCore,Adobe AIR,Adobe Flash Player,Adventure Game Studio,AEGIS,AGI,Alien Shooter Engine,ALIVE,Amityville,Anvil,AnvilNext,Apex,ArenaNet Guild Wars,Asura,Asura engine,Asylum,Atrophy,Aurora Engine,Avalanche engine,Babel engine,Beard+Razor,BGI/Ethornell,BigWorld,Black Desert Engine,Black Sun Engine,Blam! Engine,Blazing Renderer,Blender Game Engine,Box2D,Build,C-Engine,C++,C4 Engine,CANVAS Engine,CATHODE Engine,CatSystem2,Chameleon,Chrome Engine,Clausewitz Engine,Clickteam Fusion,CloakNT,COBRA,Cocos2d-x,Construct 2,Corona SDK,Cougar Adventure Engine,createjs,Creation Engine,CryEngine,CryEngine 3,Cryptic Engine,Crystal Engine,Crystal Space,Crystal Tools,Custom built engine,Cyber Dreams Engine,Dagor Engine,Dark Alliance Engine,Dark Engine,DarkBASIC Pro,Dawn Engine,Defold,Descent Engine,Despair,Diesel,Disrupt,Distortion Tools,Divinity Engine,Dragon Engine,DreamWorld,Dunia Engine,E.V.I.L Engine,Eclipse Engine,EDuke 32,Ego Engine,Emmersion,Enforce,Enfusion,Enigma engine,Essence Engine,Evolution,Evolution Engine,Falling Everything Engine,FAME Tech,Fighter Maker,Firaxis LORE,Firebird Engine,Flashpunk,FLEDGE Engine,Flixel,Forgelight Engine,Foundation Engine,Fox Engine,fps creator classic,Frostbite,Game Maker,Game Maker Studio,Gamebryo,GameMaker,GameMaker Studio 2,GameMaker: Studio,GEM,Genie Engine,Genome,Geo-Mod,Geo-Mod 2.0,Gepard 3D engine,Gex engine,Gideros,Glacier,Glacier 2,GlyphX,Godfather engine,Godot,GoldSrc,Groovie,Havok,Havok Physics,Heaps.io,HeroEngine,HPL,HPL Engine,HydroEngine,Ice-Peak Engine,IceWave,id Tech 1,id Tech 2,id Tech 3,id Tech 4,id Tech 5,id Tech 6,iMUSE,In-house engine,In House Engine,Infernal Engine,Infinity Engine,InnocentGrey,Intelligent Stupidity,isiMotor,IW Engine,Jade,Java,Jedi,Jomini Engine,K2 Engine,KEX,KiriKiri,KRASS Engine,KT Engine,Leadwerks,libGDX,Liquid Engine,LithTech,LithTech Jupiter EX,Lithtech Triton,LS3D,LyN,MAX-FX,MEGA Engine,Mercury Steam Engine,Microsoft XNA,Moai,MonkeyX,MonoGame,MT Framework,Multimedia Fusion,N2System,Nebula Device,NetImmerse,NightShade Engine,Nod Engine,Northlight Engine,NoviceX,Ner,Nvidia PhysX,NVLMaker,Odyssey,OEngine,Offset Engine,OGRE,Omen Engine,Onyx Engine,OpenFL,OpenGL,Orion Engine,Orochi,Orx,Phoenix Engine (Relic),Phoenix Engine (Wolfire),Phoenix VR,PhyreEngine,PhysX,Plasma,Playground SDK,Prism3D,Prometheus In-Game Engine,Proprietary Engine,Quest,Quicksilver X,RE Engine,Real Live,Real Virtuality,Real Virtuality 3,Real Virtuality 4,Ren'Py Visual Novel Engine,RENA,RenderWare,Retox,Road Hog Engine,ROMU,Ronin,RPG Maker,RPG Maker MV,RPG Maker VX Ace,RPG Maker XP,RSPiX,rUGP,SAGA,SAGE,Sahara Engine (custom built),SCI,SCI0,Scimitar,SCUMM,Serious Engine,Serious Engine 4,Serious Engine 4.0,Shark 3D,Shooting Game Builder,Sierra's Creative Interpreter,SiglusEngine,Silent Storm Engine,Silk Engine,Sith,Snowdrop,Soft Engine,Source,Source 2,Spark Casual Engine,Sparkle Engine,SpeedTree,Sprint,SRPG Studio,Starlight,Stingray Engine,Stratagus,Sunshine Engine,SurRender 3D,Taito Type X,TDRPG Engine,Telltale Tool,Terrabuilder,The Alan Wake Engine,The Banner Saga Engine,The Illusion Engine,The Madness Engine,The Sims 3 Engine,TheEngine,Titanium,Top Hat Engine,Torque 2D,Torque 3D,Torque Game Engine,Traktor,Trinigy Vision Engine,Turbine G3,Turbulenz Engine,TW Engine 2,TW Engine 3,Twine,UbiArt Framework,Unigine,Unity,Unity 2017,Unity 2018,Unity 2019,Unity 4,Unity 5,Unity3D,Unreal Engine,Unreal Engine 2,Unreal Engine 2.5,Unreal Engine 3,Unreal Engine 4,Velocity Engine,Virtools Engine,Virtual Dream,Virtual Theatre,Vision,Visionaire,Visual Novel Maker,Void Engine,Voxel Space,VRAGE,VueJS,Whale 2,Wintermute Engine,Wolf RPG Editor,Wolfenstein 3D,Wolfenstein 3D Engine,X-ray Engine,X Engine,X3 Reality,Xed,XNA Game Studio,YU-RIS  Engine,Z-Engine,ZEN,ZenGin,Zero,Zod Engine",",")
Fengine_name2 <- as.vector(unlist(Fengine_name2))
Ffirst_release_date4 <- strsplit("01-01,01-03,01-04,01-07,01-08,01-09,01-10,01-11,01-12,01-13,01-14,01-15,01-16,01-17,01-18,01-19,01-20,01-21,01-22,01-23,01-24,01-26,01-27,01-28,01-30,01-31,02-01,02-02,02-03,02-04,02-05,02-06,02-07,02-09,02-10,02-11,02-12,02-13,02-14,02-15,02-16,02-17,02-18,02-19,02-20,02-21,02-22,02-23,02-24,02-26,02-27,02-28,02-29,03-01,03-02,03-05,03-06,03-08,03-09,03-10,03-11,03-12,03-13,03-14,03-15,03-16,03-17,03-18,03-20,03-21,03-22,03-23,03-24,03-25,03-27,03-28,03-29,03-30,03-31,04-01,04-02,04-03,04-04,04-05,04-06,04-07,04-08,04-09,04-10,04-11,04-12,04-13,04-14,04-15,04-16,04-17,04-19,04-20,04-21,04-22,04-23,04-24,04-25,04-26,04-27,04-28,04-29,04-30,05-01,05-02,05-03,05-04,05-05,05-06,05-07,05-08,05-09,05-10,05-11,05-13,05-14,05-15,05-16,05-17,05-18,05-20,05-21,05-22,05-23,05-24,05-25,05-27,05-28,05-29,05-30,05-31,06-01,06-02,06-03,06-04,06-05,06-06,06-08,06-09,06-11,06-12,06-13,06-14,06-15,06-16,06-17,06-18,06-19,06-20,06-21,06-22,06-23,06-24,06-25,06-26,06-27,06-28,06-29,06-30,07-01,07-02,07-03,07-04,07-05,07-06,07-07,07-08,07-09,07-10,07-11,07-12,07-13,07-15,07-16,07-17,07-18,07-19,07-20,07-21,07-22,07-23,07-24,07-25,07-26,07-27,07-28,07-29,07-30,07-31,08-01,08-02,08-03,08-04,08-05,08-06,08-07,08-09,08-10,08-11,08-12,08-13,08-14,08-15,08-16,08-17,08-18,08-19,08-21,08-22,08-23,08-24,08-25,08-26,08-27,08-28,08-29,08-30,09-01,09-02,09-03,09-04,09-06,09-07,09-08,09-09,09-10,09-11,09-12,09-13,09-14,09-15,09-16,09-17,09-18,09-19,09-21,09-22,09-24,09-25,09-26,09-27,09-29,09-30,10-01,10-02,10-03,10-04,10-05,10-06,10-07,10-10,10-11,10-12,10-13,10-14,10-15,10-16,10-17,10-19,10-20,10-21,10-22,10-23,10-24,10-29,10-30,10-31,11-01,11-02,11-03,11-05,11-06,11-07,11-11,11-12,11-13,11-14,11-17,11-18,11-19,11-20,11-21,11-22,11-23,11-24,11-25,11-28,11-29,11-30,12-01,12-02,12-03,12-04,12-05,12-06,12-07,12-09,12-10,12-11,12-12,12-13,12-14,12-15,12-16,12-17,12-18,12-19,12-20,12-22,12-23,12-24,12-25,12-27,12-28,12-30,12-31",",")
Ffirst_release_date4 <- as.vector(unlist(Ffirst_release_date4))
Fengine_name8 <- strsplit("D Game Studio,A-Life,A.L.I.V.E.,a000ff,AbbeyCore,Adobe AIR,Adobe Flash Player,Adventure Game Studio,AEGIS,AGI,Alien Shooter Engine,ALIVE,Amityville,AnvilNext,Apex,ArenaNet Guild Wars,Asura,Asura engine,Asylum,Aurora Engine,Babel engine,Beard+Razor,BGI/Ethornell,BigWorld,Black Desert Engine,Blazing Renderer,Blender Game Engine,Box2D,Build,C-Engine,C4 Engine,CANVAS Engine,CatSystem2,Clausewitz Engine,Clickteam Fusion,CloakNT,COBRA,Cocos2d-x,Construct 2,Corona SDK,Cougar Adventure Engine,createjs,CryEngine,CryEngine 3,Cryptic Engine,Crystal Engine,Crystal Space,Crystal Tools,Custom built engine,Cyber Dreams Engine,Dagor Engine,Dark Alliance Engine,Dark Engine,DarkBASIC Pro,Defold,Descent Engine,Despair,Diesel,Distortion Tools,Divinity Engine,Dragon Engine,DreamWorld,EDuke 32,Ego Engine,Emmersion,Enforce,Enfusion,Enigma engine,Essence Engine,Evolution,Evolution Engine,Falling Everything Engine,FAME Tech,Fighter Maker,Firaxis LORE,Flashpunk,Flixel,Forgelight Engine,Fox Engine,fps creator classic,Frostbite,Game Maker,Game Maker Studio,GameMaker,GameMaker Studio 2,GameMaker: Studio,GEM,Genie Engine,Genome,Geo-Mod,Geo-Mod 2.0,Gepard 3D engine,Gex engine,Glacier,GlyphX,Godot,GoldSrc,Groovie,Havok Physics,Heaps.io,HeroEngine,HPL,HPL Engine,Ice-Peak Engine,IceWave,id Tech 1,id Tech 2,id Tech 4,id Tech 6,iMUSE,In-house engine,Infernal Engine,Infinity Engine,InnocentGrey,Intelligent Stupidity,Java,Jedi,Jomini Engine,K2 Engine,KEX,KiriKiri,KRASS Engine,KT Engine,libGDX,Liquid Engine,LithTech Jupiter EX,Lithtech Triton,LyN,MEGA Engine,Mercury Steam Engine,Microsoft XNA,Moai,MonkeyX,MonoGame,MT Framework,Multimedia Fusion,N2System,Nebula Device,NetImmerse,NightShade Engine,Nod Engine,NoviceX,Ner,Nvidia PhysX,NVLMaker,OEngine,Offset Engine,OGRE,Omen Engine,OpenGL,Orochi,Orx,Phoenix Engine (Relic),Phoenix Engine (Wolfire),Phoenix VR,PhyreEngine,PhysX,Plasma,Playground SDK,Prism3D,Prometheus In-Game Engine,Proprietary Engine,Quest,Quicksilver X,RE Engine,Real Live,Real Virtuality 3,Real Virtuality 4,Ren'Py Visual Novel Engine,RENA,Retox,Road Hog Engine,ROMU,Ronin,RPG Maker,RPG Maker MV,RPG Maker XP,RSPiX,rUGP,SAGA,SAGE,SCI,SCI0,Serious Engine,Serious Engine 4,Serious Engine 4.0,Shark 3D,Shooting Game Builder,Sierra's Creative Interpreter,SiglusEngine,Silent Storm Engine,Silk Engine,Sith,Snowdrop,Soft Engine,Source,Spark Casual Engine,Sparkle Engine,SpeedTree,Sprint,SRPG Studio,Starlight,Stingray Engine,Stratagus,Sunshine Engine,SurRender 3D,Taito Type X,TDRPG Engine,Terrabuilder,The Banner Saga Engine,The Madness Engine,TheEngine,Titanium,Torque 2D,Torque 3D,Torque Game Engine,Traktor,Trinigy Vision Engine,Turbine G3,Turbulenz Engine,TW Engine 2,TW Engine 3,Twine,Unigine,Unity,Unity 2017,Unity 2018,Unity 2019,Unity 4,Unity 5,Unity3D,Unreal Engine,Unreal Engine 2,Unreal Engine 2.5,Unreal Engine 3,Unreal Engine 4,Velocity Engine,Virtools Engine,Virtual Dream,Virtual Theatre,Vision,Visionaire,Void Engine,Voxel Space,VRAGE,VueJS,Whale 2,Wintermute Engine,Wolf RPG Editor,Wolfenstein 3D Engine,X-ray Engine,X Engine,Xed,XNA Game Studio,YU-RIS  Engine,Z-Engine,ZEN,Zero,Zod Engine",",")
Fengine_name8 <- as.vector(unlist(Fengine_name8))
Fengine_name9 <- strsplit("4A Engine,CATHODE Engine,Chrome Engine,Creation Engine,Dawn Engine,Disrupt,Dunia Engine,Eclipse Engine,Gamebryo,Glacier 2,Godfather engine,Havok,id Tech 3,id Tech 5,IW Engine,Jade,LithTech,LS3D,MAX-FX,Northlight Engine,Odyssey,OpenFL,RenderWare,RPG Maker VX Ace,Scimitar,SCUMM,Telltale Tool,The Alan Wake Engine,The Illusion Engine,The Sims 3 Engine,UbiArt Framework,ZenGin",",")
Fengine_name9 <- as.vector(unlist(Fengine_name9))
Ffirst_release_date5 <- strsplit("01-25,01-29,02-08,02-25,03-03,03-04,03-07,03-19,03-26,04-18,05-12,05-19,05-26,07-14,08-08,08-20,08-31,09-05,09-20,09-28,10-08,10-09,10-18,10-25,10-26,10-27,10-28,11-04,11-08,11-09,11-10,11-15,11-16,11-26,11-27,12-08",",")
Fengine_name10 <- strsplit("A.L.I.V.E.,Adobe AIR,Adobe Flash Player,Adventure Game Studio,Anvil,AnvilNext,Atrophy,Avalanche engine,Black Sun Engine,Blam! Engine,Build,C++,Chameleon,Clickteam Fusion,COBRA,Cocos2d-x,Cougar Adventure Engine,Custom built engine,Dark Alliance Engine,Dark Engine,Diesel,Disrupt,E.V.I.L Engine,Ego Engine,Firaxis LORE,Firebird Engine,FLEDGE Engine,Foundation Engine,Fox Engine,GameMaker: Studio,Gideros,GoldSrc,HydroEngine,id Tech 2,id Tech 3,id Tech 5,id Tech 6,In-house engine,Infernal Engine,isiMotor,IW Engine,Jade,Leadwerks,LithTech,Microsoft XNA,MT Framework,Odyssey,OGRE,Onyx Engine,Orion Engine,Phoenix Engine (Relic),PhysX,Proprietary Engine,Real Virtuality,Road Hog Engine,SAGE,Sahara Engine (custom built),Sierra's Creative Interpreter,Snowdrop,Source 2,Spark Casual Engine,Telltale Tool,Top Hat Engine,Torque Game Engine,TW Engine 2,Unity,Unity 2018,Unity 5,Unity3D,Unreal Engine,Unreal Engine 4,Virtools Engine,Visual Novel Maker,Void Engine,Wolfenstein 3D,X-ray Engine,X3 Reality,YU-RIS  Engine",",")
Fengine_name10 <- as.vector(unlist(Fengine_name10))
Fengine_name20 <- strsplit("A.L.I.V.E.,Adobe AIR,Adobe Flash Player,Adventure Game Studio,Anvil,Atrophy,Avalanche engine,Black Sun Engine,Blam! Engine,Build,C++,Chameleon,Clickteam Fusion,COBRA,Cocos2d-x,Cougar Adventure Engine,Dark Alliance Engine,Dark Engine,Diesel,E.V.I.L Engine,Ego Engine,FLEDGE Engine,GameMaker: Studio,Gideros,GoldSrc,HydroEngine,id Tech 3,In-house engine,Infernal Engine,isiMotor,Jade,Leadwerks,LithTech,MT Framework,OGRE,Orion Engine,Phoenix Engine (Relic),PhysX,Proprietary Engine,Real Virtuality,Road Hog Engine,SAGE,Sahara Engine (custom built),Sierra's Creative Interpreter,Source 2,Spark Casual Engine,Telltale Tool,Top Hat Engine,Torque Game Engine,TW Engine 2,Unity,Unity 2018,Unity 5,Unity3D,Unreal Engine 4,Virtools Engine,Visual Novel Maker,Wolfenstein 3D,X-ray Engine,X3 Reality,YU-RIS  Engine",",")
Fengine_name20 <- as.vector(unlist(Fengine_name20))
Fengine_name21 <- strsplit("AnvilNext,Custom built engine,Disrupt,Firaxis LORE,Firebird Engine,Foundation Engine,Fox Engine,id Tech 2,id Tech 5,id Tech 6,IW Engine,Microsoft XNA,Odyssey,Onyx Engine,Snowdrop,Unreal Engine,Void Engine",",")
Fengine_name21 <- as.vector(unlist(Fengine_name21))
Fengine_name11 <- strsplit("Creation Engine,Crystal Engine,Dunia Engine,Havok,Havok Physics,In House Engine,RenderWare,Source,Unreal Engine 3",",")
Fengine_name11 <- as.vector(unlist(Fengine_name11))
Ffirst_release_date22 <- strsplit("03-04,03-19,03-26,08-20,09-05,10-08,10-18,10-26,10-27,10-28,11-09,11-15,11-16,11-27",",")
Ffirst_release_date22 <- as.vector(unlist(Ffirst_release_date22))
Ffirst_release_date23 <- strsplit("01-25,04-18,10-09,10-25,11-10,11-26",",")
Ffirst_release_date23 <- as.vector(unlist(Ffirst_release_date23))
Fengine_name3 <- c("RAGE","REDengine")
Fengine_name3 <- as.vector(unlist(Fengine_name3))
Ffirst_release_date6 <- strsplit("04-16,04-28,05-14,10-25,12-09",",")
Ffirst_release_date6 <- as.vector(unlist(Ffirst_release_date6))
Ffirst_release_date7 <- strsplit("05-18,09-16",",")
Ffirst_release_date7 <- as.vector(unlist(Ffirst_release_date7))

FNo_8 <- no(
  leaf = 1,
  value = 45.20978,#trocar
  teste = function(game){
    if(is.na(game[1,6])){
      return(-1)
    }else{
      if(game[1,6] %in% Fengine_name8){
        return(1)
      }else{
        return(0)
      }
    }
  },
  name = "FNo_8")

FNo_9 <- no(
  leaf = 1,
  value = 179.00259,
  teste = function(game){
    if(is.na(game[1,6])){
      return(-1)
    }else{
      if(game[1,6] %in% Fengine_name9){
        return(1)
      }else{
        return(0)
      }
    }
  },
  name = "FNo_9")

FNo_4 <- no(
  left = FNo_8,
  right = FNo_9,
  leaf = 0,
  teste = function(game){
    if(is.na(game[1,3])){
      return(-1)
    }else{
      if(game[1,3] %in% Ffirst_release_date4){
        return(1)
      }else{
        return(0)
      }
    }
  },
  name = "FNo_4")

FNo_20 <- no(
  leaf = 1,
  value = 87.24551,
  teste = function(game){
    if(is.na(game[1,6])){
      return(-1)
    }else{
      if(game[1,6] %in% Fengine_name20){
        return(1)
      }else{
        return(0)
      }
    }
  },
  name = "FNo_20")

FNo_21 <- no(
  leaf = 1,
  value = 307.17547,
  teste = function(game){
    if(is.na(game[1,6])){
      return(-1)
    }else{
      if(game[1,6] %in% Fengine_name21){
        return(1)
      }else{
        return(0)
      }
    }
  },
  name = "FNo_21")

FNo_10 <- no(
  left = FNo_20,
  right = FNo_21,
  leaf = 0,
  teste = function(game){
    if(is.na(game[1,6])){
      return(-1)
    }else{
      if(game[1,6] %in% Fengine_name10){
        return(1)
      }else{
        return(0)
      }
    }
  },
  name = "FNo_10")

FNo_22 <- no(
  leaf = 1,
  value = 508.68434,
  teste = function(game){
    if(is.na(game[1,3])){
      return(-1)
    }else{
      if(game[1,3] %in% Ffirst_release_date22){
        return(1)
      }else{
        return(0)
      }
    }
  },
  name = "FNo_22")

FNo_23 <- no(
  leaf = 1,
  value = 876.64388,
  teste = function(game){
    if(is.na(game[1,3])){
      return(-1)
    }else{
      if(game[1,3] %in% Ffirst_release_date23){
        return(1)
      }else{
        return(0)
      }
    }
  },
  name = "FNo_23")

FNo_11 <- no(
  left = FNo_22,
  right = FNo_23,
  leaf = 0,
  teste = function(game){
    if(is.na(game[1,6])){
      return(-1)
    }else{
      if(game[1,6] %in% Fengine_name10){
        return(1)
      }else{
        return(0)
      }
    }
  },
  name = "FNo_11")

FNo_5 <- no(
  left = FNo_10,
  right = FNo_11,
  leaf = 0,
  teste = function(game){
    if(is.na(game[1,3])){
      return(-1)
    }else{
      if(game[1,3] %in% Ffirst_release_date5){
        return(1)
      }else{
        return(0)
      }
    }
  },
  name = "FNo_5")

FNo_2 <- no(
  left = FNo_4,
  right = FNo_5,
  leaf = 0,
  teste = function(game){
    if(is.na(game[1,6])){
      return(-1)
    }else{
      if(game[1,6] %in% Fengine_name2){
        return(1)
      }else{
        return(0)
      }
    }
  },
  name = "FNo_2")

FNo_6 <- no(
  leaf = 1,
  value = 384.96289,
  teste = function(game){
    if(is.na(game[1,3])){
      return(-1)
    }else{
      if(game[1,3] %in% Ffirst_release_date6){
        return(1)
      }else{
        return(0)
      }
    }
  },
  name = "FNo_6")

FNo_7 <- no(
  leaf = 1,
  value = 1693.26074,
  teste = function(game){
    if(is.na(game[1,3])){
      return(-1)
    }else{
      if(game[1,3] %in% Ffirst_release_date7){
        return(1)
      }else{
        return(0)
      }
    }
  },
  name = "FNo_7")

FNo_3 <- no(
  left = FNo_6,
  right = FNo_7,
  leaf = 0,
  teste = function(game){
    if(is.na(game[1,6])){
      return(-1)
    }else{
      if(game[1,6] %in% Fengine_name3){
        return(1)
      }else{
        return(0)
      }
    }
  },
  name = "FNo_3")

FNo_1 <- no(left = FNo_2, right = FNo_3, leaf = 0, name = "FNo_1")

Read_conv <- function(){
  setwd(path.expand('~'))
  bd <-read.csv("data_examplemisso.csv",",")
  bd$age_rating <- as.character(bd$age_rating)
  bd$first_release_date <- as.character(bd$first_release_date)
  return(bd)
}

StackSSS <- setClass("StackSSS")
NoEmpty  <- setClass("NoEmpty",contains="StackSSS")
StackNo  <- setClass("StackNo",contains="StackSSS",representation = representation(value = "Tree", nextno = "StackSSS"),
                     prototype=prototype(value = new("Empty"),nextno = new("NoEmpty")))

Stack <- setRefClass("Stack",fields = list(top = "StackSSS", bottom = "StackSSS"),
                     methods = list(
                       push = function(value){
                         if(class(.self$top)[1] == "NULL"){
                           
                           .self$top <- StackNo(value = value)
                           .self$bottom <- .self$top
                         }else{
                           .self$top <- StackNo(value = value,nextno = .self$top)
                         }
                         
                       },
                       pop = function(){
                         
                         poped <- .self$top
                         .self$top <- .self$top@nextno
                         
                         return(poped)
                       },
                       clear = function(){
                         .self$top <- NULL
                       },
                       append = function(stk){
                         
                         aux <- Stack()
                         
                         while(class(stk$top)[1] != "NoEmpty" ){
                           aux$push(stk$pop()@value)
                           
                         }
                         
                         while(class(aux$top)[1] != "NoEmpty" ){
                           .self$push(aux$pop()@value)
                           
                         }
                         
                         
                       },
                       showStack = function(){
                         currentno <- .self$top
                         print(currentno@value@name)
                         while(class(currentno@nextno)[1] != "NoEmpty"){
                           
                           print(currentno@nextno@value@name)
                           currentno <- currentno@nextno
                         }
                       },
                       ReturnStack = function(){
                         
                         currentno <- .self$top
                         
                         ret <- "path"
                         while(class(currentno@nextno)[1] != "NoEmpty"){
                           
                           
                           ret <- paste(ret, currentno@value@name, sep = ",")
                           currentno <- currentno@nextno
                         }
                         
                         return(ret)
                       }
                     ))
#fim



busca <- function(no,game,HistoryB){
  
  HistoryB$push(no)
  if(no@leaf == 1){
    
    return()
  }
  
  resright <- no@right@teste(game)
  resleft <- no@left@teste(game)
  
  if(resright == 0 && resleft == 1){
    
    busca(no@left,game,HistoryB)
    
  }else if(resright == 1 && resleft == 0){
    
    busca(no@right,game,HistoryB)
    
  }else if(resleft == -1 && resright == -1){
    
    HisLeft  <- new("Stack")
    HisRight <- new("Stack")
    
    busca(no@right,game,HisRight)
    
    
    busca(no@left,game,HisLeft)
    
    if(HisLeft$top@value@value > HisRight$top@value@value){
      
      HistoryB$append(HisLeft)
    }else{
      HistoryB$append(HisRight)
    }
    
    
  }
  if(class(HistoryB)[1] != "NoEmpty"){
    HistoryB$showStack()
  }
  
  
}

args = commandArgs(trailingOnly=TRUE)

if(length(args) == 0){
  stop("No args provided")
}

id_game = args[1]

show_value <- function(no){
  if(no@leaf == 0){
    return(-1)
  }else{
    return(no@value)
  }
}

get_game <- function(id_game) {
  
  firstSQL <- c("select 
        game.id as id_game,
        to_char(game.age_rating,'FM99') as age_rating,
        to_char(first_release_date, 'MM-DD') as first_release_date,
        game.time_to_beat,
        game.price,
        game_mode.name as gamemode_name,
        game_engines.name as Engine_name,
        genres.name as genres_name,
        themes.name as themes_name,
        keywords.name as keywords_name,
        player_perspectives.name as player_perspectives_name
        from 
        game
        left join game_mode_game on game.id = game_mode_game.id_game
        left join game_mode on game_mode.id = game_mode_game.id_game_mode
        left join game_engines on game_engines.id = game.id_game_engine
        left join game_genres on game.id = game_genres.id_game
        left join genres on genres.id = game_genres.id_genre
        left join game_themes on game.id = game_themes.id_game
        left join themes on themes.id = game_themes.id_theme
        left join game_player_perspectives on game.id = game_player_perspectives.id_game
        left join player_perspectives on player_perspectives.id = game_player_perspectives.id_player_perspective
        left join game_keywords on game.id = game_keywords.id_game
        left join keywords on keywords.id = game_keywords.id_keyword
        where game.id = ",id_game,";")
  
  truSQL <- paste(firstSQL,collapse = "")
  
  res <- dbSendQuery(con, truSQL)
  
  game = dbFetch(res, n=-1)
  
  dbClearResult(res)
  
  return (game)
}

Better_route <- function(no_inicial_arv, game){
  History <- new("Stack")
  busca(no_inicial_arv,game,History)
  
  return(History)
}

Insert_on_json <- function(History,file,l1){
  if(l1 == "HNo_1"){
    l <- list("HNo_2" = Hfirst_release_date2,
              "HNo_3" = Hfirst_release_date3,
              "HNo_4" = Hfirst_release_date4,
              "HNo_5" = Hfirst_release_date5,
              "HNo_6" = Hprice6,
              "HNo_7" = Hprice7,
              "HNo_8" = Hengine_name8,
              "HNo_9" = Hengine_name9,
              "HNo_12" = Hengine_name12,
              "HNo_13" = Hengine_name13,
              "HNo_18" = Hfirst_release_date18,
              "HNo_19" = Hfirst_release_date19, 
              "HNo_24" = Hprice24,
              "HNo_25" = Hprice25)
  }else if(l1 == "FNo_1"){
    l <- list("FNo_2" = Fengine_name2 ,
              "FNo_3" = Fengine_name3 ,
              "FNo_4" = Ffirst_release_date4 ,
              "FNo_5" = Ffirst_release_date5 ,
              "FNo_6" = Ffirst_release_date6 ,
              "FNo_7" = Ffirst_release_date7 ,
              "FNo_8" = Fengine_name8 ,
              "FNo_9" = Fengine_name9 ,
              "FNo_10" = Fengine_name10 ,
              "FNo_11" = Fengine_name11 ,
              "FNo_20" = Fengine_name20 ,
              "FNo_21" = Fengine_name21 ,
              "FNo_22" = Ffirst_release_date22 ,
              "FNo_23" = Ffirst_release_date23 )
  }else if(l1 == "TRNo_1"){
    l <- list("TRNo_2" = TRfirst_release_date2 ,
              "TRNo_3" = TRfirst_release_date3 ,
              "TRNo_4" = TRfirst_release_date4 ,
              "TRNo_5" = TRfirst_release_date5 ,
              "TRNo_6" = TRengine_name6 ,
              "TRNo_7" = TRengine_name7 ,
              "TRNo_8" = TRengine_name8 ,
              "TRNo_9" = TRengine_name9 ,
              "TRNo_10" = TRengine_name10 ,
              "TRNo_11" = TRengine_name11 ,
              "TRNo_12" = TRfirst_release_date12  ,
              "TRNo_13" = TRfirst_release_date13  ,
              "TRNo_14" = TRfirst_release_date14  ,
              "TRNo_15" = TRfirst_release_date15  ,
              "TRNo_16" = TRengine_name16 ,
              "TRNo_17" = TRengine_name17 ,
              "TRNo_20" = TRfirst_release_date20  ,
              "TRNo_21" = TRfirst_release_date21  ,
              "TRNo_24" = TRengine_name24 ,
              "TRNo_25" = TRengine_name25 ,
              "TRNo_26" = TRengine_name26 ,
              "TRNo_27" = TRengine_name27 ,
              "TRNo_48" = TRfirst_release_date48  ,
              "TRNo_49" = TRfirst_release_date49  )
  }else{
    return(-1)
  }
  #dict name values
  r <- list("HNo_2" = "first_release_date2",
            "HNo_3" = "first_release_date3",
            "HNo_4" = "first_release_date4",
            "HNo_5" = "first_release_date5",
            "HNo_6" = "price6",
            "HNo_7" = "price7",
            "HNo_8" = "engine_name8",
            "HNo_9" = "engine_name9",
            "HNo_12" = "engine_name12",
            "HNo_13" = "engine_name13",
            "HNo_18" = "first_release_date18",
            "HNo_19" = "first_release_date19", 
            "HNo_24" = "price24",
            "HNo_25" = "price25",
            "FNo_2" = "engine_name2" ,
            "FNo_3" = "engine_name3" ,
            "FNo_4" = "first_release_date4" ,
            "FNo_5" = "first_release_date5" ,
            "FNo_6" = "first_release_date6" ,
            "FNo_7" = "first_release_date7" ,
            "FNo_8" = "engine_name8" ,
            "FNo_9" = "engine_name9" ,
            "FNo_10" = "engine_name10" ,
            "FNo_11" = "engine_name11" ,
            "FNo_20" = "engine_name20" ,
            "FNo_21" = "engine_name21" ,
            "FNo_22" = "first_release_date22" ,
            "FNo_23" = "first_release_date23" ,
            "TRNo_2" = "first_release_date2" ,
            "TRNo_3" = "first_release_date3" ,
            "TRNo_4" = "first_release_date4" ,
            "TRNo_5" = "first_release_date5",
            "TRNo_6" = "engine_name6" ,
            "TRNo_7" = "engine_name7" ,
            "TRNo_8" = "engine_name8" ,
            "TRNo_9" = "engine_name9" ,
            "TRNo_10" = "engine_name10" ,
            "TRNo_11" = "engine_name11" ,
            "TRNo_12" = "first_release_date12"  ,
            "TRNo_13" = "first_release_date13"  ,
            "TRNo_14" = "first_release_date14"  ,
            "TRNo_15" = "first_release_date15"  ,
            "TRNo_16" = "engine_name16" ,
            "TRNo_17" = "engine_name17" ,
            "TRNo_20" = "first_release_date20"  ,
            "TRNo_21" = "first_release_date21"  ,
            "TRNo_24" = "engine_name24" ,
            "TRNo_25" = "engine_name25" ,
            "TRNo_26" = "engine_name26" ,
            "TRNo_27" = "engine_name27" ,
            "TRNo_48" = "first_release_date48"  ,
            "TRNo_49" = "first_release_date49"  )
  
  #dict values
  val <- list("HNo_2" = HNo_2@value,
            "HNo_3" = HNo_3@value,
            "HNo_4" = HNo_4@value,
            "HNo_5" = HNo_5@value,
            "HNo_6" = HNo_6@value,
            "HNo_7" = HNo_7@value,
            "HNo_8" = HNo_8@value,
            "HNo_9" = HNo_9@value,
            "HNo_12" = HNo_12@value,
            "HNo_13" = HNo_13@value,
            "HNo_18" = HNo_18@value,
            "HNo_19" = HNo_19@value, 
            "HNo_24" = HNo_24@value,
            "HNo_25" = HNo_25@value,
            "FNo_2" = FNo_2@value ,
            "FNo_3" = FNo_3@value ,
            "FNo_4" = FNo_4@value ,
            "FNo_5" = FNo_5@value ,
            "FNo_6" = FNo_6@value ,
            "FNo_7" = FNo_7@value ,
            "FNo_8" = FNo_8@value ,
            "FNo_9" = FNo_9@value ,
            "FNo_10" = FNo_10@value ,
            "FNo_11" = FNo_11@value ,
            "FNo_20" = FNo_20@value ,
            "FNo_21" = FNo_21@value ,
            "FNo_22" = FNo_22@value ,
            "FNo_23" = FNo_23@value ,
            "TRNo_2" = TRNo_2@value ,
            "TRNo_3" = TRNo_3@value ,
            "TRNo_4" = TRNo_4@value ,
            "TRNo_5" = TRNo_5@value,
            "TRNo_6" = TRNo_6@value ,
            "TRNo_7" = TRNo_7@value ,
            "TRNo_8" = TRNo_8@value ,
            "TRNo_9" = TRNo_9@value ,
            "TRNo_10" = TRNo_10@value ,
            "TRNo_11" = TRNo_11@value ,
            "TRNo_12" = TRNo_12@value  ,
            "TRNo_13" = TRNo_13@value  ,
            "TRNo_14" = TRNo_14@value  ,
            "TRNo_15" = TRNo_15@value  ,
            "TRNo_16" = TRNo_16@value ,
            "TRNo_17" = TRNo_17@value ,
            "TRNo_20" = TRNo_20@value  ,
            "TRNo_21" = TRNo_21@value  ,
            "TRNo_24" = TRNo_24@value ,
            "TRNo_25" = TRNo_25@value ,
            "TRNo_26" = TRNo_26@value ,
            "TRNo_27" = TRNo_27@value ,
            "TRNo_48" = TRNo_48@value  ,
            "TRNo_49" = TRNo_9@value  )
  #-----------------------------------------------------
  
  result <- History$ReturnStack()
  result <- strsplit(History$ReturnStack(),",")
  result <- as.vector(unlist(result))
  result <- result[!result %in% "path"]
  testString <- list()
  
  DataFrame <- data.frame()
  i <- 1
  while(!is.na(result[i])){
    
    testString[i] <- paste(toString(l[[result[i]]]), toString(val[[result[i]]]))
    
    testString[i] <- toString(l[[result[i]]])
    
  
    i = i+1
  }
  
  testString <- append(testString,toString(val[[result[1]]]))
  
  DataFrame <- data.frame(testString)
  
  i <- 1
  while(!is.na(result[i])){
    
    names(DataFrame)[i] <- r[result[i]]
    i = i+1
  }
  names(DataFrame)[length(DataFrame)] <- "predict"
  
  
  file <- toJSON(DataFrame)
  return(file)
}

file <- "["
file <- append(file,Insert_on_json(Better_route(HNo_1,get_game(id_game)),file,"HNo_1"))
file <- append(file,",")
file <- append(file,Insert_on_json(Better_route(FNo_1,get_game(id_game)),file,"FNo_1")) 
file <- append(file,",")
file <- append(file,Insert_on_json(Better_route(TRNo_1,get_game(id_game)),file,"TRNo_1"))
file <- append(file,"]")

name_arq <- c("data_",as.character(as.numeric(Sys.time())*100000),".json")

name_arq <- paste(name_arq, collapse = "")

if(dir.exists(path.expand('rdata'))){
  setwd(path.expand('rdata'))
  file.create(name_arq)
  filecon <- file(name_arq)
  writeLines(file,filecon)
}else{
  dir.create("rdata")
  setwd(path.expand('rdata'))
  file.create(name_arq)
  filecon <- file(name_arq)
  writeLines(file,filecon)
}

location <- c(path.expand('rdata/'), name_arq)
location <- paste(location,collapse = "")
dbDisconnect(con)  

location
