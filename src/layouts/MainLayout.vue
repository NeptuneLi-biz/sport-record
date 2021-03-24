<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          運動記錄
        </q-toolbar-title>

        <!-- TODO: 這裡要用 API 顯示版本號，之後要變成一個關於我們的頁面 -->
        <div>v{{ version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list
        padding
        class="menu-list"
      >
        <MenuList
          v-for="list in menuList"
          :key="list.title"
          v-bind="list"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import MenuList from 'components/MenuList.vue';

const version = '1.0';
const menuList = [
  {
    title: '運動項目',
    icon: 'mdi-puzzle-edit-outline',
    link: '/SportItem'
  },
  {
    title: '運動類型',
    icon: 'mdi-layers-outline',
    link: '/SportType'
  },
  {
    title: '運動記錄',
    icon: 'mdi-pencil',
    link: '/Record'
  }
];

export default {
  name: 'MainLayout',
  components: { MenuList },
  data() {
    return {
      leftDrawerOpen: false,
      menuList,
      version
    };
  }
};
</script>
