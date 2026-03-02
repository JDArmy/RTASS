<template>
  <div>
    <!-- RTASS Plus开关 -->
    <div style="text-align: right; margin: 10px 10px 20px 10px; display: flex; justify-content: flex-end; align-items: center; gap: 12px;">
      <el-switch
        v-model="plusmode"
        size="large"
        active-text="RTASS+"
        inactive-text="RTASS"
        @change="calcFinally"
        style="--el-switch-on-color: #67c23a; --el-switch-off-color: #409eff;"
      />
      <el-button type="primary" size="default" @click="resetVector" style="border-radius: 8px; font-weight: 500;">{{
        $t("reset")
      }}</el-button>
    </div>
    <!-- RTASS Plus开关 end -->

    <!-- scoring pane start -->
    <el-row style="text-align: center; margin: 0 -10px;">
      <!-- 分类 -->
      <el-col
        v-for="(factorTypeVal, factorTypeKey) in RTASS.factorCategories"
        :key="factorTypeKey"
        :sm="12"
        :xs="24"
        style="padding: 0 10px; margin-bottom: 20px;"
      >
        <div class="category">
        <h3>{{ $t(`RTASS.factorCategories.${factorTypeKey}.name`) }}</h3>
        <el-row class="factorType" style="margin: 0 -8px;">
          <!-- process score start -->
          <el-col
            v-for="factorGroupKey in factorTypeVal.processScores"
            :key="factorGroupKey"
            :md="8"
            :sm="24"
            style="padding: 0 8px; margin-bottom: 16px;"
          >
            <div class="process-score">
            <h4>{{ $t(`RTASS.processScores.${factorGroupKey}.name`) }}</h4>
            <el-row class="factorGroup">
              <!-- 评分因子 -->
              <el-col
                v-for="factorKey in Object.keys(
                  RTASS.processScores[factorGroupKey].vectors
                )"
                :key="factorKey"
                :span="24"
              >
                <h5
                  class="text-center"
                  :title="RTASS.factors[factorKey]['description']"
                >
                  {{ $t(`RTASS.factors.${factorKey}.name`) }}[{{ factorKey }}]
                </h5>
                <!-- 选择评分项 start -->
                <el-select
                  v-model="vectorVal[factorKey]"
                  class="m-2 vector-seleter"
                  :class="'text-' + vectorVal[factorKey]"
                  placeholder="Select"
                  :title="$t(`RTASS.factors.${factorKey}.description`)"
                  @change="calcFinally()"
                  :disabled="
                    plusmode === true &&
                    RTASS.factors[factorKey]['vectors'] !== undefined
                  "
                >
                  <el-option
                    v-for="(_, vectorVal) in RTASS.factors[factorKey][
                      'options'
                    ]"
                    :label="
                      $t(`RTASS.factors.${factorKey}.options[${vectorVal}]`)
                    "
                    :key="vectorVal"
                    :value="vectorVal"
                    :title="
                      $t(`RTASS.factors.${factorKey}.options[${vectorVal}]`)
                    "
                  />
                </el-select>
                <!-- 选择评分项 end -->
                <!--abilities start-->
                <div
                  class="abilities-container"
                  v-if="
                    plusmode === true &&
                    RTASS.factors[factorKey]['vectors'] !== undefined
                  "
                >
                  <div
                    class="abilities"
                    v-for="abilityKey in Object.keys(
                      RTASS.factors[factorKey]['vectors']
                    )"
                    :key="abilityKey"
                  >
                    <h6 class="text-center">
                      {{ $t(`RTASS.abilities.${abilityKey}.name`) }}[{{
                        abilityKey
                      }}]
                    </h6>
                    <el-select
                      class="m-2"
                      :class="'text-' + vectorVal[abilityKey]"
                      v-model="vectorVal[abilityKey]"
                      @change="calcFinally()"
                      :title="$t(`RTASS.abilities.${abilityKey}.description`)"
                      placeholder="Select"
                    >
                      <el-option
                        v-for="(_, abilityVal) in RTASS.abilities[abilityKey][
                          'options'
                        ]"
                        :key="abilityVal"
                        :title="
                          $t(
                            `RTASS.abilities.${abilityKey}.options[${abilityVal}]`
                          )
                        "
                        :label="
                          $t(
                            `RTASS.abilities.${abilityKey}.options[${abilityVal}]`
                          )
                        "
                        :value="abilityVal"
                      />
                    </el-select>
                  </div>
                </div>
                <!--abilities end-->
              </el-col>
              <!-- 评分因子结束 -->
            </el-row>
            <!-- process score result start -->
            <el-row>
              <el-col :span="24" :offset="0">
                <div
                  class="alert process-score-result text-center"
                  role="alert"
                  :class="
                    'text-' + RTASS.levels[levels[factorGroupKey]]['keyword']
                  "
                >
                  <h5>
                    {{ $t(`RTASS.processScores.${factorGroupKey}.name`) }}[{{
                      factorGroupKey
                    }}]:<br />
                    {{ $t(`RTASS.levels.${levels[factorGroupKey]}.name`)
                    }}<br />
                    {{ scores[factorGroupKey] }}
                  </h5>
                </div>
              </el-col>
            </el-row>
            <!-- process score result end -->
            </div>
          </el-col>
          <!-- process score end -->
        </el-row>
        </div>
      </el-col>
      <!-- 分类结束 -->
    </el-row>
    <!-- scoring pane end -->

    <!-- final score start -->
    <el-row style="margin: 20px -8px; gap: 0;">
      <el-col
        :md="6"
        :sm="12"
        :xs="24"
        :offset="0"
        v-for="(_, scoringKey) in RTASS.finalScores"
        :key="scoringKey"
        style="padding: 0 8px; margin-bottom: 16px;"
      >
        <div class="finalScores" :class="'text-' + RTASS.levels[levels[scoringKey]]['keyword']">
        <h4>
          {{ $t(`RTASS.finalScores.${scoringKey}.name`) }}[{{
            scoringKey
          }}]:<br />
          {{ $t(`RTASS.levels.${levels[scoringKey]}.name`) }}<br />
          {{ scores[scoringKey] }}
        </h4>
        </div>
      </el-col>
    </el-row>
    <!-- final score end -->

    <!-- vector uri start -->
    <el-row>
      <el-col :span="24" class="score-vector" :offset="0">
        <a :href="scoreVectorUrl">{{ scoreVector }}</a>
        <el-button
          type="primary"
          size="small"
          @click="copyVector"
          style="margin-left: 12px;"
        >
          <el-icon v-if="copyStatus === 'default'"><CopyDocument /></el-icon>
          <el-icon v-else-if="copyStatus === 'success'"><Select /></el-icon>
          <el-icon v-else><Close /></el-icon>
          {{ $t("copy") }}
        </el-button>
      </el-col>
    </el-row>
    <!-- vector uri end -->

    <!-- ription start -->
    <el-row>
      <el-col :span="24" :offset="0" class="score-ription"
        ><span>{{ $t("inThisAssessment") }}</span>
        <span
          v-for="(scoringItem, scoringKey) in RTASS.finalScores"
          :key="scoringKey"
        >
          <strong> {{ $t(`RTASS.finalScores.${scoringKey}.name`) }} </strong>
          <span>
            : "{{ $t(`RTASS.levels.${levels[scoringKey]}.name`) }}"({{
              scores[scoringKey]
            }});&nbsp;
          </span>
        </span>
        <div>{{ $t("processingScore") }}</div>
        <div
          v-for="factorGroupKey in Object.keys(RTASS.processScores)"
          :key="factorGroupKey"
        >
          <strong>
            {{ $t(`RTASS.processScores.${factorGroupKey}.name`) }}</strong
          >
          <span>
            : "{{ $t(`RTASS.levels.${levels[factorGroupKey]}.name`) }}"({{
              scores[factorGroupKey]
            }});&nbsp; {{ $t("inProcessingScore") }}
          </span>

          <span
            v-for="factorKey in Object.keys(
              RTASS.processScores[factorGroupKey].vectors
            )"
            :key="factorKey"
          >
            <strong> {{ $t(`RTASS.factors.${factorKey}.name`) }} </strong
            >:&nbsp;
            {{
              $t(
                `RTASS.factors.${factorKey}.options[${vectorVal[factorKey]}]`
              ).replace(/\d+\s?\-?\s?/, "")
            }};&nbsp;
          </span>
        </div>
      </el-col>
    </el-row>
    <!-- description end -->

    <!-- charts start -->
    <el-row v-show="plusmode" style="margin: 0 -8px;">
      <el-col
        :md="12"
        :sm="24"
        :offset="0"
        v-for="(_, chartKey) in RTASS.charts.data"
        :key="chartKey"
        style="padding: 0 8px;"
      >
        <div class="chart-pane">
        <h5>{{ $t(`RTASS.charts.data.${chartKey}.name`) }}</h5>
        <canvas :id="'chart-' + chartKey"></canvas>
        </div>
      </el-col>
    </el-row>
    <!-- charts end -->
  </div>
</template>
<script lang="js" src="./HomeView.js"></script>
<style src="./HomeView.css"></style>
