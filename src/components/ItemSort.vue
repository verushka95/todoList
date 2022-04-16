<template>
    <div :class="myclass">
        <span v-for="item in data" :key="item.id" class="sort__item" :class="{'sort__item_active': item.selected}" @click="doFilter(item)">
            {{ item.value }}
        </span>
    </div>
</template>
<script>
export default {
    props: {
        data: {type: Array, required: true},
        myclass: {type: String}
    },
    methods: {
        doFilter(item){
            this.$emit('clickFilter', item);
        }
    }
}
</script>