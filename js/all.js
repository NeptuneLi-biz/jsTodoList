var app = new Vue({
    el: '#app',
    data: {
        newTodo: '',
        todo: [
            {
                'id': '1',
                'title': '進行中代辦事項',
                'completed': false,
            },
            {
                'id': '2',
                'title': '已完成代辦事項',
                'completed': true,
            },
        ],
        tempTodo: [],
        tempTitle: '',
        nowTab: 'all',
    },
    methods: {
        // 新增事件
        addTodo: function() {
            var tempTodo = this.newTodo.trim();
            
            // 如果沒有資料就不給新增
            if(tempTodo === '') {
                return;
            }

            var timestamp = Math.floor(Date.now());
            this.todo.push({
                'id': timestamp,
                'title': tempTodo,
                'completed': false,
            })
            this.newTodo = '';
        },

        // 更新事件
        editTodo: function(item) {
            // call by reference
            // tempTodo指向原先的todo
            this.tempTodo = item;
            this.tempTitle = item.title;
        },

        // 停止更新Todo
        quitEditTodo: function() {
            this.tempTodo = [];
            this.tempTitle = '';
        },

        // 成功更新Todo
        successEditTodo: function() {
            // 修改該筆的todo.title
            this.tempTodo.title = this.tempTitle;
            this.tempTodo = [];
            this.tempTitle = '';
        },

        // 刪除該行Todo
        removeTodo: function(data) {
            var vm = this;
            var newIndex = vm.todo.findIndex(function(item){
                return data.id === item.id
            })
            this.todo.splice(newIndex, 1);
        },

        // 刪除所有Todo
        removeAllTodo: function() {
            var ans = confirm("是否要刪除所有代辦事項？");
            if(ans) {
                this.todo = [];
            }
        },
    },
    computed: {
        // 篩選Todo狀態
        filterTodo: function() {
            var filterTodo = [];
            if(this.nowTab === 'all') {
                return this.todo;
            } else if(this.nowTab === 'doing') {
                this.todo.forEach(function(item) {
                    // 如果有進行中的，就放進陣列
                    if (!item.completed) {
                        filterTodo.push(item);
                    }
                })
            } else if (this.nowTab === 'done') {
                this.todo.forEach(function (item) {
                    // 如果有完成的，就放進陣列
                    if (item.completed) {
                        filterTodo.push(item);
                    }
                })
            }
            return filterTodo;
        },

        // 計算進行中的Todo數量
        doingLen: function() {
            var vm = this;
            let len = 0;
            vm.todo.forEach(function(item) {
                if(!item.completed) {
                    len++;
                }
            })
            return len;
        },

        // 計算已完成的Todo數量
        doneLen: function() {
            var vm = this;
            let len = 0;
            vm.todo.forEach(function(item) {
                if(item.completed) {
                    len++;
                }
            })
            return len;
        },
    },
})