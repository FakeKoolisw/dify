const translation = {
  steps: {
    header: {
      creation: '创建知识库',
      update: '上传文件',
    },
    one: '选择数据源',
    two: '文本分段与清洗',
    three: '处理并完成',
  },
  error: {
    unavailable: '该知识库不可用',
  },
  stepOne: {
    filePreview: '文件预览',
    pagePreview: '页面预览',
    dataSourceType: {
      file: '导入已有文本',
      notion: '同步自 Notion 内容',
      web: '同步自 Web 站点',
    },
    uploader: {
      title: '上传文本文件',
      button: '拖拽文件至此，或者',
      browse: '选择文件',
      tip: '已支持 {{supportTypes}}，每个文件不超过 {{size}}MB。',
      validation: {
        typeError: '文件类型不支持',
        size: '文件太大了，不能超过 {{size}}MB',
        count: '暂不支持多个文件',
        filesNumber: '批量上传限制 {{filesNumber}}。',
      },
      cancel: '取消',
      change: '更改文件',
      failed: '上传失败',
    },
    notionSyncTitle: 'Notion 未绑定',
    notionSyncTip: '同步 Notion 内容前，须先绑定 Notion 空间',
    connect: '去绑定',
    button: '下一步',
    emptyDatasetCreation: '创建一个空知识库',
    modal: {
      title: '创建空知识库',
      tip: '空知识库中还没有文档，你可以在今后任何时候上传文档至该知识库。',
      input: '知识库名称',
      placeholder: '请输入知识库名称',
      nameNotEmpty: '名称不能为空',
      nameLengthInvaild: '名称长度不能超过 40 个字符',
      cancelButton: '取消',
      confirmButton: '创建',
      failed: '创建失败',
    },
    website: {
      fireCrawlNotConfigured: 'Firecrawl 未配置',
      fireCrawlNotConfiguredDescription: '请配置 Firecrawl 的 API 密钥以使用它。',
      configure: '配置',
      run: '运行',
      firecrawlTitle: '使用 🔥Firecrawl 提取网页内容',
      firecrawlDoc: 'Firecrawl 文档',
      firecrawlDocLink: '',
      options: '选项',
      crawlSubPage: '爬取子页面',
      limit: '限制数量',
      maxDepth: '最大深度',
      excludePaths: '排除路径',
      includeOnlyPaths: '仅包含路径',
      extractOnlyMainContent: '仅提取主要内容（无标题、导航、页脚等）',
      exceptionErrorTitle: '运行 Firecrawl 时发生异常:',
      totalPageScraped: '抓取页面总数:',
      selectAll: '全选',
      resetAll: '重置全部',
      scrapTimeInfo: '总共在 {{time}} 内抓取了 {{total}} 个页面',
    },
  },
  stepTwo: {
    segmentation: '分段设置',
    auto: '自动分段与清洗',
    autoDescription: '自动设置分段规则与预处理规则，如果不了解这些参数建议选择此项',
    custom: '自定义',
    customDescription: '自定义分段规则、分段长度以及预处理规则等参数',
    separator: '分段标识符',
    separatorPlaceholder: '例如换行符（\n）或特定的分隔符（如 "***"）',
    maxLength: '分段最大长度',
    overlap: '分段重叠长度',
    overlapTip: '设置分段之间的重叠长度可以保留分段之间的语义关系，提升召回效果。建议设置为最大分段长度的10%-25%',
    overlapCheck: '分段重叠长度不能大于分段最大长度',
    rules: '文本预处理规则',
    removeExtraSpaces: '替换掉连续的空格、换行符和制表符',
    removeUrlEmails: '删除所有 URL 和电子邮件地址',
    removeStopwords: '去除停用词，例如 “a”，“an”，“the” 等',
    preview: '确认并预览',
    reset: '重置',
    indexMode: '索引方式',
    qualified: '高质量',
    recommend: '推荐',
    qualifiedTip: '调用系统默认的嵌入接口进行处理，以在用户查询时提供更高的准确度',
    warning: '请先完成模型供应商的 API KEY 设置。.',
    click: '前往设置',
    economical: '经济',
    economicalTip: '使用离线的向量引擎、关键词索引等方式，降低了准确度但无需花费 Token',
    QATitle: '采用 Q&A 分段模式',
    QATip: '开启后将会消耗额外的 token',
    QALanguage: '分段使用',
    emstimateCost: '执行嵌入预估消耗',
    emstimateSegment: '预估分段数',
    segmentCount: '段',
    calculating: '计算中...',
    fileSource: '预处理文档',
    notionSource: '预处理页面',
    other: '和其他 ',
    fileUnit: ' 个文件',
    notionUnit: ' 个页面',
    previousStep: '上一步',
    nextStep: '保存并处理',
    save: '保存并处理',
    cancel: '取消',
    sideTipTitle: '为什么要分段和预处理？',
    sideTipP1: '在处理文本数据时，分段和清洗是两个重要的预处理步骤。',
    sideTipP2: '分段的目的是将长文本拆分成较小的段落，以便模型更有效地处理和理解。这有助于提高模型生成的结果的质量和相关性。',
    sideTipP3: '清洗则是对文本进行预处理，删除不必要的字符、符号或格式，使知识库更加干净、整洁，便于模型解析。',
    sideTipP4: '通过对知识库进行适当的分段和清洗，可以提高模型在实际应用中的表现，从而为用户提供更准确、更有价值的结果。',
    previewTitle: '分段预览',
    previewTitleButton: '预览',
    previewButton: '切换至 Q&A 形式',
    previewSwitchTipStart: '当前分段预览是文本模式，切换到 Q&A 模式将会',
    previewSwitchTipEnd: '消耗额外的 token',
    characters: '字符',
    indexSettedTip: '要更改索引方法，请转到',
    retrivalSettedTip: '要更改检索方法，请转到',
    datasetSettingLink: '知识库设置。',
  },
  stepThree: {
    creationTitle: '🎉 知识库已创建',
    creationContent: '我们自动为该知识库起了个名称，您也可以随时修改',
    label: '知识库名称',
    additionTitle: '🎉 文档已上传',
    additionP1: '文档已上传至知识库：',
    additionP2: '，你可以在知识库的文档列表中找到它。',
    stop: '停止处理',
    resume: '恢复处理',
    navTo: '前往文档',
    sideTipTitle: '接下来做什么',
    sideTipContent: '当文档完成索引处理后，知识库即可集成至应用内作为上下文使用，你可以在提示词编排页找到上下文设置。你也可以创建成可独立使用的 ChatGPT 索引插件发布。',
    modelTitle: '确认停止索引过程吗？',
    modelContent: '如果您需要稍后恢复处理，则从停止处继续。',
    modelButtonConfirm: '确认停止',
    modelButtonCancel: '取消',
  },
}

export default translation
