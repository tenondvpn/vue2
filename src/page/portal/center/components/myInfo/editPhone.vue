<template>
  <Dialog
    :visible.sync="dialogVisible"
    title="修改手机号"
    width="700px"
    :confirmLoading="confirmLoading"
    @handleConfirm="handleConfirm"
    :buttonSet="buttonSet">
    <template #content>
      <el-steps :active="currentStep" align-center>
        <el-step title="身份验证"></el-step>
        <el-step title="设置绑定手机号"></el-step>
      </el-steps>
      <el-form
        :rules="rules"
        ref="verifyForm"
        :model="verifyForm"
        v-if="currentStep === 0">
        <el-form-item prop="phone" label="手机号码">
          <div style="display: flex">
            <el-input
              v-model="verifyForm.phone"
              auto-complete="off"
              placeholder="请输入手机号码"
              disabled>
            </el-input>
            <el-button
              plain
              :disabled="isGetting"
              @click="handleGetSmsCode(verifyForm.phone)"
              >{{
                isGetting ? "重新发送(" + second + ")" : "获取验证码"
              }}</el-button
            >
          </div>
        </el-form-item>
        <el-form-item prop="smsCode" label="短信验证码">
          <div style="display: flex">
            <el-input
              v-model="verifyForm.smsCode"
              auto-complete="off"
              placeholder="请输入短信验证码">
            </el-input>
          </div>
        </el-form-item>
      </el-form>
      <el-form :rules="rules" ref="editForm" :model="editForm" v-else>
        <el-form-item prop="phone" label="手机号码">
          <el-input
            v-model="editForm.phone"
            auto-complete="off"
            placeholder="请输入手机号码">
          </el-input>
        </el-form-item>
        <el-form-item prop="smsCode" label="短信验证码">
          <div style="display: flex">
            <el-input
              v-model="editForm.smsCode"
              auto-complete="off"
              placeholder="请输入短信验证码">
            </el-input>
            <el-button plain :disabled="isGetting" @click="handleGetSmsCode(editForm.phone)">{{
              isGetting ? "重新发送(" + second + ")" : "获取验证码"
            }}</el-button>
          </div>
        </el-form-item>
      </el-form>
    </template>
  </Dialog>
</template>
<script>
import { isMobile } from "@/util/validate";
import timer from "@/mixins/timer";
import { validateSms, updateBladeUserInfo } from "@/api/user";
import { getTopUrl } from "@/util/util";
import { info } from "@/api/system/tenant"; 

export default {
  mixins: [timer],
  data() {
    return {
      dialogVisible: false,
      confirmLoading: false,
      currentStep: 0,
      verifyForm: {},
      editForm: {},
      form: {},
      rules: {
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (isMobile(value)) {
                callback();
              } else {
                callback(new Error("手机号码格式不正确"));
              }
            },
            trigger: "blur",
          },
        ],
        smsCode: [
          { required: true, message: "请输入短信验证码", trigger: "blur" },
        ],
      },
      type: 3,
      tenantId: "",
      tenantMode: false,
      userId: "",
    };
  },
  computed: {
    buttonSet() {
      const selfConfirmButtonText = this.currentStep === 0 ? "下一步" : "确认";
      return {
        selfConfirmButtonText,
        selfCalcellButtonText: "取消",
      };
    },
  },
  async created() {
    // await this.getTenant()
  },
  methods: {
    handleConfirm() {
      if (this.currentStep === 0) {
        this.$refs.verifyForm.validate(async (valid) => {
          if (valid) {
            try {
              await validateSms({
                ...this.verifyForm,
                tenantId: this.tenantId,
              });
              this.currentStep++;
            } catch (e) {
              this.verifyForm.smsCode = "";
            }
            this.clearTimer();
          }
        });
      } else {
        this.$refs.editForm.validate(async (valid) => {
          // if (this.editForm.phone === this.verifyForm.phone) {
          //   this.editForm.phone = "";
          //   return this.$message.warning("新手机号不能与原手机号一致");
          // }
          this.confirmLoading = true;
          if (valid) {
            try {
              await validateSms({
                ...this.editForm,
                tenantId: this.tenantId,
              });
              const form = {
                id: this.userId,
                phone: this.editForm.phone,
              }
              const res = await updateBladeUserInfo(form);
              console.log(res)
              this.$message.success("修改手机号成功");
              this.dialogVisible = false;
              this.$emit('close');
            } catch (e) {
              this.editForm.smsCode = "";
              this.clearTimer();
            }
          }
          this.confirmLoading = false;
        });
      }
    },
    open(form) {
      this.dialogVisible = true;
      this.currentStep = 0;
      this.verifyForm.phone = form.phone;
      this.userId = form.id;
    },
    handleGetSmsCode(phone){
      this.form.phone = phone;
      this.getSmsCode();
    },
    getTenant() {
      const domain = getTopUrl()
      info(domain).then((res) => {
        const data = res.data
        if (data.success && data.data.tenantId) {
          this.tenantMode = false
          this.tenantId = data.data.tenantId
        } else {
          this.$message.warning("租户信息获取失败，请切换访问地址!")
        }
      })
    }
  },
};
</script>
