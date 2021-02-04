<template>
    <div class="vue-template">
        <form>
            <h3>Sign In</h3>

            <div class="form-group">
                <label>Email address</label>
                <input type="email" class="form-control form-control-lg" />
            </div>

            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control form-control-lg" />
            </div>

            <button type="submit" class="btn btn-dark btn-lg btn-block">Sign In</button>
        </form>
    </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
    name: "Login"
})
</script>