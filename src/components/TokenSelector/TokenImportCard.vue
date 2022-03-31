<template>
  <div class="token-import-card">
    <QuestionCircleIcon />
    <div class="description">
      This token doesn't appear on the active token list(s).
      Make sure this is the token that you want to trade.
    </div>

    <div class="token-info">
      <img :src="`https://avatars.z52da5wt.xyz/${token.contract_id}`">
      <div class="symbol">
        {{ token.symbol }}
      </div>
      <div class="name">
        {{ token.name }}
      </div>
      <a
        v-if="activeNetwork"
        :href="`${activeNetwork.explorerUrl}/contracts/${token.contract_id}`"
        target="_blank"
      >
        {{ token.contract_id }}
      </a>
    </div>

    <ButtonDefault
      class="import-button"
      @click.prevent="$emit('token:import')"
    >
      Import
    </ButtonDefault>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ButtonDefault from '../ButtonDefault.vue';
import QuestionCircleIcon from '../../assets/question-circle.svg?vue-component';

export default {
  components: {
    ButtonDefault,
    QuestionCircleIcon,
  },
  props: {
    token: {
      type: Object,
      required: true,
    },
  },
  emits: ['token:import'],
  computed: mapGetters(['activeNetwork']),
};
</script>

<style lang="scss" scoped>
@use '../../styles/variables.scss';
@use '../../styles/typography.scss';

.token-import-card {
  border-top: 1px solid variables.$color-black;
  padding: 28px 14px;
  color: variables.$color-white;
  line-height: 22px;

  @extend %face-sans-16-regular;

  svg {
    width: 44px;
    height: 44px;
  }

  .description {
    padding: 28px;
  }

  .token-info {
    background-color: variables.$color-black;
    border-radius: 20px;
    padding: 18px;
    margin-bottom: 10px;

    .symbol {
      color: variables.$color-white;
      font-weight: 500;
    }

    .name {
      color: variables.$color-gray2;
      font-size: 12px;
    }

    img {
      width: 44px;
      height: 44px;
      border-radius: 50%;
    }

    a {
      color: variables.$color-blue;
      text-decoration: none;

      @extend %face-sans-12-regular;
    }
  }

  .import-button {
    width: 100%;
    padding: 10px 0;
    border-radius: 20px;

    @extend %face-sans-16-medium;
  }
}
</style>