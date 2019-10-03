use exampledb;

INSERT INTO Users(authId, screenName, imageUrl, createdAt, updatedAt) VALUES 
	('albert@gmail.com', 'Albert Einstein', 'https://pbs.twimg.com/profile_images/697820082248880128/wEaLPMdj_400x400.jpg', CURTIME(), CURTIME()),
	('george@gmail.com', 'George Michael', 'https://ichef.bbci.co.uk/images/ic/256x256/p04mzl1f.jpg', CURTIME(), CURTIME()),
	('huey@gmail.com', 'Huey Lewis', 'https://ichef.bbci.co.uk/images/ic/256x256/p02stp9x.jpg', CURTIME(), CURTIME()),
	('michael@gmail.com', 'Michael J. Fox', 'https://pbs.twimg.com/profile_images/3468449191/a522098885588c4725add67b3bda02f7.png', CURTIME(), CURTIME());
    
INSERT INTO GamePrefs(UserId, gameId, gameName, createdAt, updatedAt) VALUES 
	(1, 'M5treAlrHc','Agricola Revised Edition', CURTIME(), CURTIME()),
    (1, 'OIXt3DmJU0','Catan', CURTIME(), CURTIME()),
    (2, '3RVcHxhPEZ','Betrayal at House on the Hill', CURTIME(), CURTIME()),
    (3, 'M5treAlrHc','Agricola Revised Edition', CURTIME(), CURTIME()),
    (3, 'OIXt3DmJU0','Catan', CURTIME(), CURTIME()),
    (3, '3RVcHxhPEZ','Betrayal at House on the Hill', CURTIME(), CURTIME()),
    (4, 'M5treAlrHc','Agricola Revised Edition', CURTIME(), CURTIME()),
    (4, 'OIXt3DmJU0','Catan', CURTIME(), CURTIME());
