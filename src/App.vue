<script setup lang="ts">
import RTASS from "@/RTASS";
import { RouterView } from "vue-router";
import MenuList from "./components/MenuList.vue";

import "element-plus/es/components/container/style/css";
import "element-plus/es/components/header/style/css";
import "element-plus/es/components/main/style/css";
import "element-plus/es/components/footer/style/css";

import iconGithub from "@/components/icons/iconGithub.vue";
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <MenuList />
      </el-header>

      <el-main>
        <el-row class="header">
          <el-col :span="24" :offset="0" style="text-align: center">
            <h3 style="margin-bottom: 0">
              {{ $t("RTASS.name") }} - {{ $t("RTASS.title") }} v{{
                RTASS.version
              }}
            </h3>
          </el-col>
        </el-row>
        <RouterView />
        <div
          class="hidden-md-and-up"
          style="text-align: center; margin-top: 20px; color: grey"
        >
          {{ $t("seeMoreInDesktop") }}
        </div>
      </el-main>

      <el-footer>
        <div class="footer">
          ©2022 JD.Army
          <span class="github">
            <a href="https://github.com/JDArmy/RTASS" target="_blank">
              <icon-github />
            </a>
          </span>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<style scoped>
.el-container {
  height: 100%;
  padding: 0;
  margin: 0;
  width: 100%;
}
.el-header {
  padding: 0;
  margin: 0;
  width: 100%;
}
.el-main {
  margin-bottom: 50px;
}
.el-footer {
  position: fixed;
  z-index: 100;
  text-align: center;
  width: 100%;
  height: auto;
  left: 0px;
  bottom: 0px;
  background-color: white;
  color: gray;
  font-size: 50%;
  padding: 5px 0 10px 0;
  border-top: 1px solid rgb(213, 213, 213);
}

.github {
  font-size: 150%;
}
</style>
