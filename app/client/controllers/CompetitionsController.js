app.controller("CompetitionsController", [ "$scope", "$location", "autorun", function($scope, $location, autorun)
{
	GAnalytics.pageview("/competitions");
	
	$scope.competitionsLoaded = false;
	$scope.competitions = [];
	$scope.i18n = i18n;
	$scope.openligadbI18n = openligadbI18n;
	
	GlobalSubsManager.subscribe("allCompetitions");
	
	autorun($scope, function()
	{
		$scope.competitions = Competitions.find({}, {
			sort : {
				orderId : -1
			}
		}).fetch();
		if ($scope.competitions.length != 0)
		{
			$scope.competitionsLoaded = true;
			Meteor.call("competitionsWithStatistics", function(error, success)
			{
				if (error)
					Log.popup.error(error);
				else
					$scope.competitions = success;
				
				$scope.competitionsLoaded = true;
				$scope.$apply();
			});
			
		}
	});
	
	$scope.createCompetition = function ()
	{
		$location.path("createCompetition");
	}
	
} ]);
