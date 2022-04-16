<template>
    <div :class="myclass">
        <span class="task-item__icon">{{ getValue }}</span>
        <span class="task-item__text" :class="getClass">{{task.name}}</span>
    </div>
</template>
<script>
export default {
    props: {
        task: {type: Object, required: true},
        myclass: {type: String}
    },
    computed: {
        getValue(){
            return this.task.completed ? '✓' : '';
        },
        getClass(){
            return this.task.completed ? 'task-item__text_completed' : 'task-item__text_active';
        }
    }
}
</script>