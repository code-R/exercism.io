
#User Guide

Hootcode is a platform for crowdsourcing mentorship on projects, also commonly referred to as Nitpicking within the platform. It is based on the the popular [exercism.io](http://exercism.io/) project by [Katrina Owen](http://kytrinyx.com/)  and relies on Github for project hosting.

What makes the change from Exercism to Hootcode?
- Added a provison to link up the Github tree source to make use of the Github authentication.

Here is the list of modules included in Hootcode.

1. Users Module
 - This module deals with User authentication via Github login.To acheive this we used Octokit.
2. Exercises Module
 - Exercise Modules contains the information of exercises present,submisssions made for each exercise and displaying the submission for each exercise
3. Solutions Module
 - This module deals with the solution that corresponds to a specific language for a specific exercise
4. Team Module
 - Using this module we can create Teams and manage teams with in the Hootcode and we can share an existing exercise solution with in the specified team.
5. Nits Module
 - Nits modules specifies the nits/suggestions that are available/given for a submitted exercise.
6. Notifications
 - The name itself indicates us that we have some notifications of the solutions that we have submitted for an exercise
7. Account Module
 - Here a protrait of the User info and the submissions amde by the User for an exercises along with nitpicks and iterations count is displayed.

  
