<!--
 * @description: 动画组件
 * @Author: Cheng kaixuan
 * @Date: 2024-05-07 17:55:19
 * @LastEditors: Cheng kaixuan
 * @LastEditTime: 2024-05-08 09:39:54
-->
<template>
    <div class="data-sync-wrap">
        <div class="data-sync">
            <div class="title-wrap">
                <div class="title">
                    <slot name="title"></slot>
                </div>
            </div>
        </div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
   
    }
</script>

<style lang="scss" scoped>
    .data-sync-wrap {
        width: 180px;
        height: 180px;
        position: absolute;
    }

    .data-sync {
        width: 180px;
        height: 180px;
        border-radius: 50%;
        overflow: hidden;
    }

    .title-wrap {
        position: absolute;
        left: 0px;
        right: 0px;
        top: 0px;
        bottom: 0px;
        margin: auto;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        z-index: 2;
        background-image:radial-gradient(rgba(0, 0, 0, 0.9),rgba(39,100,255, 0.4),rgba(39,100,255, 1));
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;

        .title{
            font-family: PingFang-SC, PingFang-SC;
            font-weight: 800;
            font-size: 20px;
            color: #FFFFFF;
            line-height: 24px;
            text-align: center;
            font-style: normal;
        }
    }

    .data-sync::before {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            width: 150%;
            height: 150%;
            background-image: radial-gradient(circle, transparent 50%, rgba(39,100,255, 0.3) 70%);
            transform-origin: center;
            animation: data-sync-animation 4s linear infinite;
        }

    @keyframes data-sync-animation {
    0% {
      transform: translate(-50%, -50%) scale(0.5);
      opacity: 1;
      width: 120%;
      height: 120%;
      border-radius: 50%;
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0;
      width: 150%;
      height: 150%;
      border-radius: 50%;
    }
  }
</style>