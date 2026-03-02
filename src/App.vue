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
            <div style="color: grey; font-size: 75%">
              {{ RTASS.keyword }} | Updated: {{ RTASS.updated }}
            </div>
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
  background: linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%);
  min-height: 100vh;
}
.el-header {
  padding: 0;
  margin: 0;
  width: 100%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}
.el-main {
  margin-bottom: 50px;
  padding: 20px;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
}
.el-footer {
  position: fixed;
  z-index: 100;
  text-align: center;
  width: 100%;
  height: auto;
  left: 0px;
  bottom: 0px;
  background: linear-gradient(to top, rgba(255, 255, 255, 0.98), rgba(255, 255, 255, 0.95));
  backdrop-filter: blur(10px);
  color: #606266;
  font-size: 50%;
  padding: 8px 0 12px 0;
  border-top: 1px solid rgba(213, 213, 213, 0.5);
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
}

.github {
  font-size: 150%;
  transition: transform 0.2s ease;
  display: inline-block;
}

.github:hover {
  transform: scale(1.1);
}

.header h3 {
  background: linear-gradient(135deg, #409eff 0%, #67c23a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 600;
  margin-bottom: 8px;
}
</style>
