// container list page controller
(function(){
    angular.module("dockerApp")
    .controller('ContainerListCtrl', ['$scope', '$location', 'Container', function($scope, $location, container){
        $scope.containerList = [];

        $scope.option = {
            currentPage: 1,
            itemPerPage : 10
        };

        function doPaging(options){
            $scope.isLoading = true;
             //数量需要过滤
             Blog.getContainerCount(options).then(function(result){
                $scope.containerCount = result.count;
                $scope.numPages = Math.ceil($scope.containerCount/$scope.options.itemsPerPage);
             });
            //获取列表
            Blog.getContainerList(options).then(function(result){
                $scope.isLoading = false;
                $scope.blogList = result.data;
            }).catch(function(){
               $scope.isLoading = false;
                $scope.containerList = [];
            });
        }
        //初始化列表
        doPaging($scope.option);

        //加载更多
       $scope.loadMore = function(page){
           $scope.options.currentPage = page;
           doPaging($scope.options, true);
       };

        // 删除容器
        $scope.delContainer= function(currentContainer){
            // 删除成功则更新当前的containers
            function updateContainers(){
                doPaging($scope.currentPage);
            }
            Container.deleteContainer({_id : currentContainer.id }, updateContainers);
        };
    }]);
})();