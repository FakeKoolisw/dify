import { memo, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import useSWR from 'swr'
import type { ModelItem, ModelLoadBalancingConfig, ModelLoadBalancingConfigEntry, ModelProvider } from '../declarations'
import ModelIcon from '../model-icon'
import ModelName from '../model-name'
import Modal from '@/app/components/base/modal'
import { Balance } from '@/app/components/base/icons/src/vender/line/financeAndECommerce'
import Switch from '@/app/components/base/switch'
import Indicator from '@/app/components/header/indicator'
import { Edit02, HelpCircle, Plus02, Trash03 } from '@/app/components/base/icons/src/vender/line/general'
import { AlertTriangle } from '@/app/components/base/icons/src/vender/line/alertsAndFeedback'
import SimplePieChart from '@/app/components/base/simple-pie-chart'
import TooltipPlus from '@/app/components/base/tooltip-plus'
import Button from '@/app/components/base/button'
import { fetchModelLoadBalancingConfig } from '@/service/common'
import Loading from '@/app/components/base/loading'

export type ModelBalancingModalProps = {
  provider: ModelProvider
  model: ModelItem
  open?: boolean
  onClose?: () => void
}

// model balancing config modal
const ModelBalancingModal = ({ provider, model, open = false, onClose }: ModelBalancingModalProps) => {
  const { t } = useTranslation()

  // useProviderCredentialsFormSchemasValue(provider.provider, model.fetch_from)
  const { data } = useSWR(
    `/workspaces/current/model-providers/${provider.provider}/models/credentials?model=${model.model}&model_type=${model.model_type}`,
    fetchModelLoadBalancingConfig,
  )

  const originalConfig = data?.load_balancing
  const [draftConfig, setDraftConfig] = useState<ModelLoadBalancingConfig>()
  useEffect(() => {
    if (originalConfig && !draftConfig)
      setDraftConfig(originalConfig)
  }, [draftConfig, originalConfig])

  const toggleModalBalancing = useCallback((enabled: boolean) => {
    if (draftConfig) {
      setDraftConfig({
        ...draftConfig,
        enabled,
      })
    }
  }, [draftConfig])

  const updateConfigEntry = useCallback(
    (
      index: number,
      modifier: (entry: ModelLoadBalancingConfigEntry) => ModelLoadBalancingConfigEntry,
    ) => {
      setDraftConfig((prev) => {
        if (!prev)
          return prev
        const newConfigs = [...prev.configs]
        newConfigs[index] = modifier(newConfigs[index])
        return {
          ...prev,
          configs: newConfigs,
        }
      })
    },
    [],
  )

  const toggleConfigEntryEnabled = useCallback((index: number, state?: boolean) => {
    updateConfigEntry(index, entry => ({
      ...entry,
      enabled: typeof state === 'boolean' ? state : !entry.enabled,
    }))
  }, [updateConfigEntry])

  return (
    <Modal
      isShow={Boolean(model) && open}
      onClose={onClose}
      wrapperClassName='!z-30'
      className='max-w-none pt-8 px-8 w-[640px]'
      title={
        <div className='pb-3 font-semibold'>
          <div className='h-[30px]'>{t('common.modelProvider.configLoadBalancing')}</div>
          {Boolean(model) && (
            <div className='flex items-center h-5'>
              <ModelIcon
                className='shrink-0 mr-2'
                provider={provider}
                modelName={model!.model}
              />
              <ModelName
                className='grow text-sm font-normal text-gray-900'
                modelItem={model!}
                showModelType
                showMode
                showContextSize
              />
            </div>
          )}
        </div>
      }
    >
      {!draftConfig
        ? <Loading type='area' />
        : (
          <>
            <div className='py-2'>
              <div
                className={classNames(
                  'min-h-16 bg-gray-50 border rounded-xl transition-colors',
                  draftConfig.enabled ? 'border-gray-200 cursor-pointer' : 'border-primary-400 cursor-default',
                )}
                onClick={draftConfig.enabled ? () => toggleModalBalancing(false) : undefined}
              >
                <div className='flex items-center px-[15px] py-3 gap-2 select-none'>
                  <div className='grow-0 flex items-center justify-center w-8 h-8 bg-white border rounded-lg'>
                    {Boolean(model) && (
                      <ModelIcon className='shrink-0' provider={provider} modelName={model!.model} />
                    )}
                  </div>
                  <div className='grow'>
                    <div className='text-sm'>{t('common.modelProvider.providerManaged')}</div>
                    <div className='text-xs text-gray-500'>Todo</div>
                  </div>
                </div>
              </div>

              <div
                className={classNames(
                  'mt-2 min-h-16 bg-gray-50 border rounded-xl transition-colors',
                  !draftConfig.enabled ? 'border-gray-200 cursor-pointer' : 'border-primary-400 cursor-default',
                )}
                onClick={!draftConfig.enabled ? () => toggleModalBalancing(true) : undefined}
              >
                <div className='flex items-center px-[15px] py-3 gap-2 select-none'>
                  <div className='grow-0 flex items-center justify-center w-8 h-8 text-primary-600 bg-indigo-50 border border-indigo-100 rounded-lg'>
                    <Balance className='w-4 h-4' />
                  </div>
                  <div className='grow'>
                    <div className='flex items-center gap-1 text-sm'>
                      {t('common.modelProvider.loadBalancing')}
                      <TooltipPlus popupContent={t('common.modelProvider.loadBalancingInfo')} popupClassName='max-w-[300px]'>
                        <HelpCircle className='w-3 h-3 text-gray-400' />
                      </TooltipPlus>
                    </div>
                    <div className='text-xs text-gray-500'>Todo</div>
                  </div>
                </div>
                {draftConfig.enabled && (
                  <div className='px-3 pb-3'>
                    {draftConfig.configs.map((config, index) => {
                      const isProviderManaged = config.name === '__inherit__'
                      return (
                        <div key={config.id || index} className='group flex items-center px-3 h-10 bg-white border border-gray-200 rounded-lg shadow-xs'>
                          <div className='grow flex items-center'>
                            <div className='flex items-center justify-center mr-2 w-3 h-3'>
                              <TooltipPlus popupContent={t('common.modelProvider.apiKeyStatusNormal')}>
                                <Indicator color='green' />
                              </TooltipPlus>
                            </div>
                            <div className='text-[13px] mr-1'>
                              {isProviderManaged ? t('common.modelProvider.defaultConfig') : config.name}
                            </div>
                            {isProviderManaged && (
                              <span className='px-1 text-2xs uppercase text-gray-500 border border-black/8 rounded-[5px]'>{t('common.modelProvider.providerManaged')}</span>
                            )}
                          </div>
                          <div className='flex items-center gap-1'>
                            {!isProviderManaged && (
                              <>
                                <div className='flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100'>
                                  <span className='flex items-center justify-center w-8 h-8 text-gray-500 bg-white rounded-lg transition-colors cursor-pointer hover:bg-black/5'>
                                    <Edit02 className='w-4 h-4' />
                                  </span>
                                  <span className='flex items-center justify-center w-8 h-8 text-gray-500 bg-white rounded-lg transition-colors cursor-pointer hover:bg-black/5'>
                                    <Trash03 className='w-4 h-4' />
                                  </span>
                                  <span className='mr-2 h-3 border-r border-r-gray-100' />
                                </div>
                              </>
                            )}
                            <Switch
                              defaultValue={Boolean(config.enabled)}
                              size='md'
                              className='justify-self-end'
                              onChange={value => toggleConfigEntryEnabled(index, value)}
                            />
                          </div>
                        </div>
                      )
                    })}

                    <div className='group flex items-center mt-1 px-3 h-10 bg-white border border-gray-200 rounded-lg shadow-xs'>
                      <div className='grow flex items-center'>
                        <div className='flex items-center justify-center mr-2 w-3 h-3'>
                          <TooltipPlus popupContent={t('common.modelProvider.apiKeyRateLimit', { seconds: 60 })}>
                            <SimplePieChart percentage={80} className='w-3 h-3' />
                          </TooltipPlus>
                        </div>
                        <div className='text-[13px] mr-1'>Another</div>
                        <span className='px-1 text-2xs uppercase text-gray-500 border border-black/8 rounded-[5px]'>{t('common.modelProvider.providerManaged')}</span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <div className='flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100'>
                          <span className='flex items-center justify-center w-8 h-8 text-gray-500 bg-white rounded-lg transition-colors cursor-pointer hover:bg-black/5'>
                            <Edit02 className='w-4 h-4' />
                          </span>
                          <span className='flex items-center justify-center w-8 h-8 text-gray-500 bg-white rounded-lg transition-colors cursor-pointer hover:bg-black/5'>
                            <Trash03 className='w-4 h-4' />
                          </span>
                          <span className='mr-2 h-3 border-r border-r-gray-100' />
                        </div>
                        <Switch
                          defaultValue={false}
                          size='md'
                          className='justify-self-end'
                          onChange={async value => value}
                        />
                      </div>
                    </div>

                    <div className='flex items-center px-3 mt-1 h-8 text-[13px] font-medium text-primary-600'>
                      <div className='flex items-center cursor-pointer'>
                        <Plus02 className='mr-2 w-3 h-3' />{t('common.modelProvider.addConfig')}
                      </div>
                    </div>
                  </div>
                )}
                {
                  draftConfig.enabled && draftConfig.configs.length < 2 && (
                    <div className='flex items-center px-6 h-[34px] text-xs text-gray-700 bg-black/2 border-t border-t-black/5'>
                      <AlertTriangle className='mr-1 w-3 h-3 text-[#f79009]' />
                      {t('common.modelProvider.loadBalancingLeastKeyWarning')}
                    </div>
                  )
                }
              </div>
            </div>

            <div className='flex items-center justify-end gap-2 mt-6'>
              <Button onClick={onClose}>{t('common.operation.cancel')}</Button>
              <Button type='primary'>{t('common.operation.save')}</Button>
            </div>
          </>
        )
      }
    </Modal >
  )
}

export default memo(ModelBalancingModal)
