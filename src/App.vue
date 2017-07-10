<template>
  <div id='app' class="container">
    <header class='headers'>
      <h1>Vue Start Kit / Bootstrap examples</h1>
      
    <b-navbar toggleable type="inverse" variant="success">

        <b-nav-toggle target="nav_collapse"></b-nav-toggle>

        <b-link class="navbar-brand" to="/">
          <span>Home</span>
        </b-link>

        <b-collapse is-nav id="nav_collapse">

          <b-nav is-nav-bar>
            <b-nav-item to='/zen/kit'>Dynamic Grid</b-nav-item>
            <b-nav-item to='/todo'>Todo List</b-nav-item>
            <b-nav-item>Contact Us</b-nav-item>
          </b-nav>

      <!--<nav class='inner'>
        <router-link to='/' exact>Home</router-link>
        <span class='spa'>·</span>
        <router-link to='/zen/Mark' exact>Mark</router-link>
        <span class='spa'>·</span>
        <router-link to='/zen/hood' exact>hood</router-link>
        <span class='spa'>·</span>
        <router-link to='/zen/hood' exact>hood</router-link>
      </nav>-->
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
    </b-navbar>

<!-- navbar.vue -->


    </header>
    <router-view class='view'></router-view>
  </div>
</template>

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
