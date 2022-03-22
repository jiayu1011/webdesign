var app = angular.module("nbApp", []); 


        app.constant("tips", { 
            add_note_empty: { 
                msg: "请输入记录内容", 
                btnTips: "好吧" 
            }, 
            add_note_exists: { 
                msg: "您记录的内容已经存在", 
                btnTips: "好吧" 
            }, 
            search_empty: { 
                msg: "请输入搜索内容", 
                btnTips: "好吧" 
            }, 
            search_success: { 
                msg: "搜到相关内容", 
                btnTips: "很好" 
            }, 
            search_failure: { 
                msg: "未搜到相关内容", 
                btnTips: "失望" 
            } 
        }); 


        app.controller("nbCtrl", function ($scope, tips) { 
            var dialogShow = function (tips) { 
                $scope.dialog_message = tips.msg; 
                $scope.dialog_btn_tips = tips.btnTips; 
                $scope.dialog_is_show = true; 
            }; 


            $scope.dialogHide = function () { 
                $scope.dialog_is_show = false; 
            }; 


            $scope.noteList = []; 


            $scope.addNote = function () { 
                if ($scope.note == undefined) { 
                    dialogShow(tips.add_note_empty); 
                    return; 
                } 


                var note = $scope.note.trim(); 
                if (note.length == 0) { 
                    dialogShow(tips.add_note_empty); 
                    return; 
                } 


                if ($scope.noteList.indexOf(note) >= 0) { 
                    dialogShow(tips.add_note_exists); 
                    return; 
                } 


                $scope.noteList.unshift(note); 
                $scope.note = ""; 
            }; 


            $scope.search = function () { 
                if ($scope.keyword == undefined) { 
                    dialogShow(tips.search_empty); 
                    return; 
                } 


                var keyword = $scope.keyword.trim(); 
                if (keyword.length == 0) { 
                    dialogShow(tips.search_empty); 
                    return; 
                } 


                if ($scope.noteList.indexOf(keyword) >= 0) { 
                    dialogShow(tips.search_success); 
                } else { 
                    dialogShow(tips.search_failure); 
                } 
            }; 
        }); 