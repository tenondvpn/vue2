<!--
 * @description: 描述信息
 * @Author: Cheng kaixuan
 * @Date: 2024-05-13 14:42:06
 * @LastEditors: why
 * @LastEditTime: 2024-08-13 17:07:23
-->
<template>
    <section class="footerWrap">
        <!-- <div class="us">联系我们</div>
        <div class="usInfo">
            <div class="item">{{getFooterCompany()}}</div>
            <div class="item">{{getFooterAddress()}}</div>
            <div class="item">{{getFooterTel()}}</div>
            <div class="item">{{getFooterEmail()}}</div>
        </div>
        <div class="line"></div> -->
        <div class="copyWrap">
            <div>{{ getCopyrightMain() }}</div>
            <!-- <div>{{ getCopyrightSub() }}</div> -->
        </div>
    </section>

</template>

<script>
import { getFooterCompany, getFooterAddress, getFooterTel, getFooterEmail, getCopyrightMain, getCopyrightSub } from "@/config/theme"
    export default {
        data() {
            return {
                
            }
        },
        created () {
            
        },
        methods: {
            getFooterCompany,
            getFooterAddress,
            getFooterTel,
            getFooterEmail,
            getCopyrightMain,
            getCopyrightSub,
        },
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/variables.scss";
    @import "~@/styles/portal/footer/phone.scss"
</style>