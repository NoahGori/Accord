/*** TIMELINE FETCH ALL ***/
SELECT *
FROM timeline_assignment_objects
WHERE timeline_id=000000000000;
/*** END TIMELINE FETCH ALL ***/


/*** TIMELINE FETCH ONE OBJECT ***/
SELECT *
FROM timeline_assignment_objects
WHERE timeline_id=00000000000 and discord_email='some@email.com';
/*** END TIMELINE FETCH ONE OBJECT ***/


/*** TIMELINE FETCH ALL PERMISSIONS ***/
SELECT *
FROM timeline_permission
WHERE timeline_id=00000000000;
/*** END TIMELINE FETCH ALL PERMISSIONS ***/


/*** TIMELINE FETCH ONE PERMISSION ***/
SELECT *
FROM timeline_permission
WHERE timeline_id=000000000000 and discord_email='some@email.com';
/*** END TIMELINE FETCH ONE PERMISSION ***/
