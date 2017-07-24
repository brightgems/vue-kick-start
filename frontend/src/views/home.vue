<template>
    <div>
        <h1>Vue Auth Plugin Demo</h1>

        <hr/>

        <h3>Test Redirects</h3>

        <ul>
            <li><router-link :to="{name: 'account'}">Test account access</router-link></li>
            <li><router-link :to="{name: 'admin'}">Test admin access</router-link></li>
            <li><router-link :to="{name: 'login'}">Test login page access</router-link></li>
        </ul>

        <hr/>

        <h3>Test Tokens</h3>

        <div style="word-wrap:break-word;">{{ token === '' ? 'select token' : (token ? token : 'no token set') }}</div>

        <ul>
            <li><a v-on:click="setToken()" href="javascript:void(0);">Test default token</a></li>
            <li><a v-on:click="setToken('other')" href="javascript:void(0);">Test other token</a></li>
            <li><a v-on:click="setToken('default')" href="javascript:void(0);">Test admin token</a></li>
            <li><a v-on:click="clearToken()" href="javascript:void(0);">Test cache clear</a></li>
            <li><a v-on:click="setDudToken()" href="javascript:void(0);">Test dud</a></li>
            <li><a v-on:click="networkDrop('other')" href="javascript:void(0);">Test network drop</a></li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                token: ''
            };
        },

        methods: {
            setToken(token){
              this.$auth.setToken(token);
            },
            getToken(){
              this.token = this.$auth.getToken()
            },
            logout(name) {
                this.$auth.logout(name);
            }
        }
    }
</script>
