<template>
  <div id='app' class="container">
    <header class='headers'>
      <h1>Welcome to VUE world, enjoy!</h1>
      
    <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">

        <el-menu-item index="0"><router-link to='/' exact>Home</router-link></el-menu-item>
        <el-menu-item index="1"><router-link to='/grid' exact>Dynamic Grid</router-link></el-menu-item>
        <el-menu-item index="2"><router-link to='/todo' exact>Todo List</router-link></el-menu-item>
        <el-menu-item index="3">Contact Us</el-menu-item>

          <b-nav is-nav-bar class="ml-auto">

            <!-- Navbar dropdowns -->
            <b-nav-item-dropdown text="Lang" right>
              <b-dropdown-item to="#">/zen/Mark</b-dropdown-item>
              <b-dropdown-item to="#">ES</b-dropdown-item>
              <b-dropdown-item to="#">RU</b-dropdown-item>
              <b-dropdown-item to="#">FA</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown right>

              <!-- Using button-content slot -->
              <template slot="button-content">
                <span style="font-weight: bold;">User</span>
              </template>

              <b-dropdown-item to="#">Profile</b-dropdown-item>
              <b-dropdown-item to="#">Signout</b-dropdown-item>
            </b-nav-item-dropdown>

          </b-nav>
        </b-collapse>
    </el-menu>

<!-- navbar.vue -->


    </header>
    <router-view class='view'></router-view>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '0',
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style lang='less'>
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;;
  font-size: 15px;
  background-color: lighten(#eceef1, 30%);
  margin: 0;
  padding-top: 55px;
  color: #34495e;
  overflow-y: scroll;
  background-color: #ffa;
}

a {
  color: #07c;
  text-decoration: none;
  &:hover {
    color: #3af;
    text-decoration: underline;
  }
}

.header {
  text-align: center;
  .link {
    margin-left: 10px;
  }
  .router-link-active {
    font-weight: bold;
    text-decoration: underline;
  }
  .spa {
    margin: 0 8px;
    font-weight: bold;
  }
}
</style>
