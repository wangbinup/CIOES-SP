// CIOES-SP V1.0.0 主界面脚本 - 参照真实界面功能
class CIOESApp {
    constructor() {
        this.currentTab = 'file'; // 默认显示文件选项卡
        this.currentViewport = 'single';
        this.selectedNodes = [];
        this.currentPropertyTab = 'geometry';
        this.viewportMode = 'single';
        this.gridEnabled = true;
        this.axesEnabled = true;
        this.messages = [];
        
        this.init();
    }

    init() {
        this.initRibbonTabs();
        this.initModelTree();
        this.initViewportControls();
        this.initPropertyPanel();
        this.initLayerPanel();
        this.initViewTabs();
        this.initQuickAccess();
        this.initWindowControls();
        this.initKeyboardShortcuts();
        this.initContextMenus();
        this.initResizeHandles(); // 添加拖拽功能初始化
        
        // 加载保存的面板尺寸
        this.loadPanelSizes();
        
        // 显示欢迎消息
        this.addMessage('info', '欢迎使用 CIOES-SP V1.0.0 海洋管道分析软件');
        this.addMessage('info', '软件界面初始化完成');
        
        console.log('CIOES-SP V1.0.0 界面初始化完成');
        
        // 延迟检查模型树状态
        setTimeout(() => {
            this.checkModelTreeStatus();
        }, 100);
    }

    // Ribbon选项卡功能
    initRibbonTabs() {
        const ribbonTabs = document.querySelectorAll('.ribbon-tab');
        const ribbonPanels = document.querySelectorAll('.ribbon-panel');

        ribbonTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.dataset.tab;
                this.switchRibbonTab(tabName);
            });
        });

        // 初始化Ribbon工具项点击事件
        this.initRibbonItems();
    }

    switchRibbonTab(tabName) {
        // 更新选项卡状态
        document.querySelectorAll('.ribbon-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // 显示对应面板
        document.querySelectorAll('.ribbon-panel').forEach(panel => {
            panel.style.display = 'none';
        });
        
        const targetPanel = document.getElementById(`${tabName}-panel`);
        if (targetPanel) {
            targetPanel.style.display = 'flex';
        }

        this.currentTab = tabName;
        console.log(`切换到选项卡: ${tabName}`);
    }

    initRibbonItems() {
        const ribbonItems = document.querySelectorAll('.ribbon-item');
        
        ribbonItems.forEach(item => {
            item.addEventListener('click', () => {
                const action = item.querySelector('.item-text').textContent;
                this.handleRibbonAction(action);
            });
        });
    }

    handleRibbonAction(action) {
        console.log(`执行Ribbon操作: ${action}`);
        
        switch(action) {
            // 文件操作
            case '新建':
                this.newProject();
                break;
            case '打开':
                this.openProject();
                break;
            case '最近':
                this.openRecentFiles();
                break;
            case '示例':
                this.openExampleProjects();
                break;
            case '关闭':
                this.closeProject();
                break;
            case '保存':
                this.saveProject();
                break;
            case '另存为':
                this.saveAsProject();
                break;
            case '保存截图':
                this.saveScreenshot();
                break;
            case '导入':
                this.importFile();
                break;
            case '导出':
                this.exportFile();
                break;
            case '打印预览':
                this.printPreview();
                break;
            case '打印':
                this.printModel();
                break;
            case '模型浏览器':
                this.openModelBrowser();
                break;

            // 基本操作
            case '选择':
                this.setSelectionMode();
                break;
            case '平移':
                this.setPanMode();
                break;
            case '缩放':
                this.setZoomMode();
                break;
            case '撤销':
                this.undo();
                break;
            case '重做':
                this.redo();
                break;
            case '复制':
                this.copy();
                break;
            case '粘贴':
                this.paste();
                break;

            // 主页操作
            case '粘贴':
                this.paste();
                break;
            case '剪切':
                this.cut();
                break;
            case '复制':
                this.copy();
                break;
            case '撤销':
                this.undo();
                break;
            case '恢复':
                this.redo();
                break;

            // 视角操作
            case '轴测视角':
                this.setView('iso');
                break;
            case '顶视图':
                this.setView('top');
                break;
            case '前视图':
                this.setView('front');
                break;
            case '右视图':
                this.setView('right');
                break;
            case '0°视图':
                this.setView('0deg');
                break;
            case '90°视图':
                this.setView('90deg');
                break;
            case '180°视图':
                this.setView('180deg');
                break;
            case '270°视图':
                this.setView('270deg');
                break;
            case 'Default':
                this.setDefaultView();
                break;
            case 'Default All':
                this.setDefaultAllViews();
                break;
            case 'Vector':
                this.setVectorView();
                break;
            case '交互平移':
                this.setPanMode();
                break;
            case '放大':
                this.zoomIn();
                break;
            case '缩小':
                this.zoomOut();
                break;
            case '上一个缩放':
                this.zoomPrevious();
                break;
            case '方框缩放':
                this.boxZoom();
                break;
            case '线框模式':
                this.setDisplayMode('wireframe');
                break;
            case '实体模式':
                this.setDisplayMode('solid');
                break;
            case '全局轴':
                this.toggleGlobalAxes();
                break;
            case '局部轴':
                this.toggleLocalAxes();
                break;
            case '单视口':
                this.switchViewportMode('single');
                break;
            case '双视口':
                this.switchViewportMode('double');
                break;
            case '四视口':
                this.switchViewportMode('quad');
                break;

            // 显示操作
            case '管点名称':
                this.togglePointNames();
                break;
            case '土壤点':
                this.toggleSoilPoints();
                break;
            case '管点符号':
                this.togglePointSymbols();
                break;
            case '重置显示选项':
                this.resetDisplayOptions();
                break;
            case '管点':
                this.togglePoints();
                break;
            case '组件':
                this.toggleComponents();
                break;
            case '分段':
                this.toggleSegments();
                break;
            case '所选分段':
                this.toggleSelectedSegments();
                break;
            case '未选分段':
                this.toggleUnselectedSegments();
                break;

            // 选择操作
            case '所有点':
                this.selectAllPoints();
                break;
            case '管点':
                this.selectPipePoints();
                break;
            case '范围':
                this.selectByRange();
                break;
            case '管线号':
                this.selectByPipeNumber();
                break;
            case '自定义点':
                this.selectCustomPoints();
                break;
            case '附加重量':
                this.selectAdditionalWeight();
                break;
            case '附加力和力矩':
                this.selectAdditionalForces();
                break;
            case '焊接接头点':
                this.selectWeldPoints();
                break;
            case '构件地震系数点':
                this.selectComponentSeismicPoints();
                break;
            case '管点地震系数':
                this.selectPipeSeismicPoints();
                break;
            case '土壤点':
                this.selectSoilPoints();
                break;
            case '分布式荷载点':
                this.selectDistributedLoadPoints();
                break;

            // 插入操作
            case '管道':
                this.insertPipe();
                break;
            case '弯头':
                this.insertElbow();
                break;
            case '法兰':
                this.insertFlange();
                break;
            case '三通':
                this.insertTee();
                break;
            case '异径接头':
                this.insertReducer();
                break;
            case '焊接接头':
                this.insertWeldJoint();
                break;
            case '支架':
                this.insertSupport();
                break;
            case '吊架':
                this.insertHanger();
                break;
            case '固定点':
                this.insertFixedPoint();
                break;
            case '滑动支撑':
                this.insertSlidingSupport();
                break;
            case '弹簧支撑':
                this.insertSpringSupport();
                break;
            case '附加重量':
                this.insertAdditionalWeight();
                break;
            case '附加力和力矩':
                this.insertAdditionalForces();
                break;
            case '分布式荷载':
                this.insertDistributedLoad();
                break;
            case '温度荷载':
                this.insertTemperatureLoad();
                break;
            case '压力荷载':
                this.insertPressureLoad();
                break;
            case '地震荷载':
                this.insertSeismicLoad();
                break;
            case '土壤点':
                this.insertSoilPoint();
                break;
            case '水动力参数':
                this.insertHydrodynamicParams();
                break;
            case '管点':
                this.insertPipePoint();
                break;
            case '管段':
                this.insertPipeSegment();
                break;
            case '构件地震系数':
                this.insertComponentSeismicCoefficient();
                break;
            case '管点地震系数':
                this.insertPipeSeismicCoefficient();
                break;
            case '工作压力和温度':
                this.insertWorkingPressureTemperature();
                break;
            case '工作荷载':
                this.insertWorkingLoad();
                break;
            case '附加位移':
                this.insertAdditionalDisplacement();
                break;
            case '复制工作工况':
                this.copyWorkingCondition();
                break;

            // 荷载操作
            case '静力地震':
                this.setStaticSeismic();
                break;
            case '荷载步加载顺序控制':
                this.controlLoadStepOrder();
                break;
            case '雪荷载':
                this.setSnowLoad();
                break;
            case '浮力荷载':
                this.setBuoyancyLoad();
                break;
            case '波浪荷载':
                this.setWaveLoad();
                break;
            case '删除波流荷载':
                this.deleteWaveLoad();
                break;

            // 分析操作
            case '荷载工况描述':
                this.setLoadCaseDescription();
                break;
            case '静力分析组':
                this.setStaticAnalysisGroup();
                break;
            case '静力分析':
                this.runStaticAnalysis();
                break;
            case '收敛控制':
                this.controlConvergence();
                break;
            case '一致性检查':
                this.checkConsistency();
                break;
            case '重合节点检查':
                this.checkOverlappingNodes();
                break;
            case '设计检查':
                this.checkDesign();
                break;
            case '土壤离散化':
                this.discretizeSoil();
                break;
            case '全部分析':
                this.runAllAnalysis();
                break;
            case '删除分析结果':
                this.deleteAnalysisResults();
                break;

            // 结果操作
            case '模型':
                this.showModelResults();
                break;
            case 'DNV':
                this.showDNVResults();
                break;
            case '组合':
                this.showCombinationResults();
                break;
            case '输入列表':
                this.showInputList();
                break;
            case '输出列表':
                this.showOutputList();
                break;
            case '结果表格':
                this.showResultTable();
                break;
            case '规范应力':
                this.showCodeStress();
                break;
            case '位移':
                this.showDisplacement();
                break;
            case '约束':
                this.showConstraints();
                break;
            case '力和力矩':
                this.showForcesAndMoments();
                break;
            case '土壤':
                this.showSoilResults();
                break;
            case '扩展组件报告':
                this.showExtendedComponentReport();
                break;
            case '过滤器':
                this.showFilter();
                break;
            case '输出报告':
                this.showOutputReport();
                break;
            case 'Excel 报告':
                this.exportExcelReport();
                break;
            case 'Word输入列表':
                this.exportWordInputList();
                break;
            case 'Word输出报告':
                this.exportWordOutputReport();
                break;
            case '模态范围选择':
                this.selectModalRange();
                break;
            case '支架':
                this.showSupportResults();
                break;
            case '法兰校核':
                this.checkFlange();
                break;

            // 工具选项卡功能
            case '常规选项':
                this.openGeneralOptions();
                break;
            case '编辑选项':
                this.openEditOptions();
                break;
            case '描述':
                this.openDescription();
                break;
            case '导向支架':
                this.openGuideSupport();
                break;
            case '保存结果':
                this.saveResults();
                break;
            case 'SQLite Report Manager':
                this.openSQLiteReportManager();
                break;
            case '测量距离':
                this.measureDistance();
                break;
            case '核算':
                this.calculateCheck();
                break;
            case '库':
                this.openLibrary();
                break;
            case '库编辑器':
                this.openLibraryEditor();
                break;
            case '修改截面数据库':
                this.modifySectionDatabase();
                break;
            case '批处理生成器':
                this.openBatchGenerator();
                break;
            case '设置':
                this.openSettings();
                break;

            // 支架优化选项卡功能
            case '重置缺省值':
                this.resetDefaultValues();
                break;

            default:
                this.addMessage('info', `功能 "${action}" 待实现`);
        }
    }

    // 模型树功能
    initModelTree() {
        // 使用事件委托来处理模型树点击
        const modelTree = document.querySelector('.model-tree');
        if (modelTree) {
            modelTree.addEventListener('click', (e) => {
                const header = e.target.closest('.node-header');
                if (!header) return;
                
                const node = header.closest('.tree-node');
                const toggleIcon = header.querySelector('.toggle-icon');
                const children = node.querySelector('.node-children');
                const nodeName = header.querySelector('.node-label').textContent;
                const isLeaf = header.classList.contains('leaf');
                
                console.log(`点击节点: ${nodeName}, 叶子节点: ${isLeaf}`);
                
                if (!isLeaf && children && toggleIcon) {
                    // 非叶子节点，处理折叠
                    e.preventDefault();
                    e.stopPropagation();
                    console.log(`折叠节点: ${nodeName}`);
                    this.toggleTreeNode(node);
                    this.selectTreeNode(header);
                } else if (isLeaf) {
                    // 叶子节点，只处理选择
                    e.preventDefault();
                    e.stopPropagation();
                    this.selectTreeNode(header);
                }
            });
        }

        // 模型树控制按钮
        this.initTreeControls();
        
        console.log('模型树初始化完成，使用事件委托处理点击');
    }

    toggleTreeNode(node) {
        const children = node.querySelector('.node-children');
        const toggleIcon = node.querySelector('.toggle-icon');
        
        if (children && toggleIcon) {
            const isExpanded = node.classList.contains('expanded');
            const nodeName = node.querySelector('.node-label').textContent;
            
            if (isExpanded) {
                node.classList.remove('expanded');
                console.log(`折叠节点: ${nodeName}`);
            } else {
                node.classList.add('expanded');
                console.log(`展开节点: ${nodeName}`);
            }
        }
    }

    selectTreeNode(header) {
        // 移除其他选中状态
        document.querySelectorAll('.node-header').forEach(h => {
            h.classList.remove('selected');
        });
        
        // 添加选中状态
        header.classList.add('selected');
        
        // 更新属性面板
        const nodeName = header.querySelector('.node-label').textContent;
        this.updatePropertiesPanel(nodeName);
        this.updateStatusBar('选中', nodeName);
        
        console.log(`选中节点: ${nodeName}`);
    }

    initTreeControls() {
        const refreshBtn = document.querySelector('.left-panel .fa-refresh');
        const expandBtn = document.querySelector('.left-panel .fa-expand-arrows-alt');
        const collapseBtn = document.querySelector('.left-panel .fa-compress-arrows-alt');

        refreshBtn?.addEventListener('click', () => this.refreshModelTree());
        expandBtn?.addEventListener('click', () => this.expandAllNodes());
        collapseBtn?.addEventListener('click', () => this.collapseAllNodes());
    }

    expandAllNodes() {
        document.querySelectorAll('.tree-node').forEach(node => {
            if (node.querySelector('.node-children')) {
                node.classList.add('expanded');
            }
        });
        this.addMessage('info', '已展开所有节点');
    }

    collapseAllNodes() {
        document.querySelectorAll('.tree-node').forEach(node => {
            if (node.querySelector('.node-children')) {
                node.classList.remove('expanded');
            }
        });
        this.addMessage('info', '已收起所有节点');
    }

    refreshModelTree() {
        this.addMessage('info', '模型树已刷新');
        console.log('刷新模型树');
    }
    
    checkModelTreeStatus() {
        const treeNodes = document.querySelectorAll('.tree-node');
        let totalNodes = 0;
        let foldableNodes = 0;
        let leafNodes = 0;
        let expandedNodes = 0;
        
        treeNodes.forEach(node => {
            totalNodes++;
            const header = node.querySelector('.node-header');
            const toggleIcon = header.querySelector('.toggle-icon');
            const children = node.querySelector('.node-children');
            const nodeName = header.querySelector('.node-label').textContent;
            
            if (children && toggleIcon && !header.classList.contains('leaf')) {
                foldableNodes++;
                if (node.classList.contains('expanded')) {
                    expandedNodes++;
                }
                console.log(`可折叠节点: "${nodeName}" - 状态: ${node.classList.contains('expanded') ? '展开' : '折叠'}`);
            } else if (header.classList.contains('leaf')) {
                leafNodes++;
            }
        });
        
        console.log(`模型树状态检查: 总节点=${totalNodes}, 可折叠=${foldableNodes}, 叶子节点=${leafNodes}, 已展开=${expandedNodes}`);
    }

    // 视口控制功能
    initViewportControls() {
        const modeBtns = document.querySelectorAll('.mode-btn');
        const viewBtns = document.querySelectorAll('.view-btn');

        modeBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                const modes = ['single', 'double', 'quad'];
                this.switchViewportMode(modes[index]);
                
                // 更新按钮状态
                modeBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        viewBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const title = btn.getAttribute('title');
                if (title === '适应视图') {
                    this.fitToView();
                } else if (title === '视图设置') {
                    this.openViewSettings();
                }
            });
        });

        // 视图控制
        const viewControls = document.querySelectorAll('.view-controls i');
        viewControls.forEach(control => {
            control.addEventListener('click', () => {
                const title = control.getAttribute('title');
                if (title === '坐标轴') {
                    this.toggleAxes();
                } else if (title === '网格') {
                    this.toggleGrid();
                }
            });
        });
    }

    switchViewportMode(mode) {
        // 这里可以实现实际的视口切换逻辑
        this.viewportMode = mode;
        this.updateStatusBar('视图', `${mode}视口`);
        this.addMessage('info', `切换到${mode}视口模式`);
        console.log(`切换到视口模式: ${mode}`);
    }

    // 属性面板功能
    initPropertyPanel() {
        const propTabs = document.querySelectorAll('.prop-tab');
        
        propTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.textContent;
                this.switchPropertyTab(tabName);
                
                // 更新选项卡状态
                propTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
            });
        });

        // 属性值变化监听
        const propertyInputs = document.querySelectorAll('.prop-input, .prop-select');
        propertyInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                this.updateProperty(e.target);
            });
        });

        // 面板固定功能
        const pinBtn = document.querySelector('.right-panel .fa-thumbtack');
        pinBtn?.addEventListener('click', () => {
            this.togglePanelPin();
        });
    }

    switchPropertyTab(tabName) {
        this.currentPropertyTab = tabName;
        console.log(`切换到属性选项卡: ${tabName}`);
        // 这里可以加载不同的属性内容
    }

    updatePropertiesPanel(nodeName) {
        const nameInput = document.querySelector('.prop-input[value]');
        if (nameInput) {
            nameInput.value = nodeName;
        }
        this.addMessage('info', `属性面板已更新: ${nodeName}`);
    }

    updateProperty(input) {
        const value = input.value;
        console.log(`属性更新: ${value}`);
        this.addMessage('info', `属性已修改: ${value}`);
    }

    // 显隐控制功能
    initLayerPanel() {
        const visibilityItems = document.querySelectorAll('.visibility-item');
        
        visibilityItems.forEach(item => {
            const toggle = item.querySelector('.visibility-toggle');
            const visibilityName = item.querySelector('.visibility-name');
            
            // 显隐切换
            toggle.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleVisibility(item);
            });
            
            // 显隐项选择
            item.addEventListener('click', () => {
                this.selectVisibilityItem(item);
            });
        });

        // 显隐控制按钮
        const showAllBtn = document.querySelector('.section-controls .fa-eye');
        const hideAllBtn = document.querySelector('.section-controls .fa-eye-slash');
        
        showAllBtn?.addEventListener('click', () => this.showAllVisibility());
        hideAllBtn?.addEventListener('click', () => this.hideAllVisibility());
    }

    toggleVisibility(visibilityItem) {
        const icon = visibilityItem.querySelector('.visibility-toggle i');
        const visibilityName = visibilityItem.querySelector('.visibility-name').textContent;
        
        if (visibilityItem.classList.contains('active')) {
            visibilityItem.classList.remove('active');
            this.addMessage('info', `"${visibilityName}" 已隐藏`);
        } else {
            visibilityItem.classList.add('active');
            this.addMessage('info', `"${visibilityName}" 已显示`);
        }
    }

    selectVisibilityItem(visibilityItem) {
        document.querySelectorAll('.visibility-item').forEach(item => {
            item.classList.remove('selected');
        });
        visibilityItem.classList.add('selected');
        
        const visibilityName = visibilityItem.querySelector('.visibility-name').textContent;
        this.addMessage('info', `选中显隐项: ${visibilityName}`);
    }

    showAllVisibility() {
        document.querySelectorAll('.visibility-item').forEach(item => {
            item.classList.add('active');
        });
        this.addMessage('info', '已显示所有项目');
    }

    hideAllVisibility() {
        document.querySelectorAll('.visibility-item').forEach(item => {
            item.classList.remove('active');
        });
        this.addMessage('info', '已隐藏所有项目');
    }

    // 视图选项卡功能
    initViewTabs() {
        const viewTabs = document.querySelectorAll('.view-tab');
        const addTabBtn = document.querySelector('.view-tab-add');
        
        viewTabs.forEach(tab => {
            const closeBtn = tab.querySelector('.close-tab');
            
            tab.addEventListener('click', (e) => {
                if (e.target !== closeBtn) {
                    this.selectViewTab(tab);
                }
            });
            
            closeBtn?.addEventListener('click', (e) => {
                e.stopPropagation();
                this.closeViewTab(tab);
            });
        });
        
        addTabBtn?.addEventListener('click', () => {
            this.addNewViewTab();
        });
    }

    selectViewTab(tab) {
        document.querySelectorAll('.view-tab').forEach(t => {
            t.classList.remove('active');
        });
        tab.classList.add('active');
        
        const viewName = tab.querySelector('span').textContent;
        this.updateStatusBar('视图', viewName);
        console.log(`切换到视图: ${viewName}`);
    }

    closeViewTab(tab) {
        const viewName = tab.querySelector('span').textContent;
        if (document.querySelectorAll('.view-tab').length > 1) {
            tab.remove();
            this.addMessage('info', `已关闭视图: ${viewName}`);
        } else {
            this.addMessage('warning', '至少需要保留一个视图');
        }
    }

    addNewViewTab() {
        const viewTabs = document.querySelector('.view-tabs');
        const addBtn = document.querySelector('.view-tab-add');
        
        const newTab = document.createElement('div');
        newTab.className = 'view-tab';
        newTab.innerHTML = `
            <span>新视图</span>
            <i class="fas fa-times close-tab"></i>
        `;
        
        viewTabs.insertBefore(newTab, addBtn);
        this.initViewTabs(); // 重新初始化事件
        this.selectViewTab(newTab);
        
        this.addMessage('info', '已添加新视图');
    }

    // 快速访问工具栏
    initQuickAccess() {
        const quickItems = document.querySelectorAll('.quick-item');
        
        quickItems.forEach(item => {
            item.addEventListener('click', () => {
                const title = item.getAttribute('title');
                this.handleQuickAction(title);
            });
        });
    }

    handleQuickAction(action) {
        switch(action) {
            case '保存':
                this.saveProject();
                break;
            case '撤销':
                this.undo();
                break;
            case '重做':
                this.redo();
                break;
            case '视图适应':
                this.fitToView();
                break;
            default:
                console.log(`快速操作: ${action}`);
        }
    }

    // 窗口控制
    initWindowControls() {
        const minimizeBtn = document.querySelector('.control-btn.minimize');
        const maximizeBtn = document.querySelector('.control-btn.maximize');
        const closeBtn = document.querySelector('.control-btn.close');
        
        minimizeBtn?.addEventListener('click', () => this.minimizeWindow());
        maximizeBtn?.addEventListener('click', () => this.maximizeWindow());
        closeBtn?.addEventListener('click', () => this.closeWindow());
    }

    minimizeWindow() {
        console.log('最小化窗口');
        this.addMessage('info', '窗口已最小化');
    }

    maximizeWindow() {
        console.log('最大化窗口');
        this.addMessage('info', '窗口已最大化');
    }

    closeWindow() {
        if (confirm('确定要关闭 CIOES-SP 吗？未保存的更改将丢失。')) {
            console.log('关闭应用程序');
        }
    }

    // 键盘快捷键
    initKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl + 组合键
            if (e.ctrlKey) {
                switch(e.key.toLowerCase()) {
                    case 'n':
                        e.preventDefault();
                        this.newProject();
                        break;
                    case 'o':
                        e.preventDefault();
                        this.openProject();
                        break;
                    case 's':
                        e.preventDefault();
                        this.saveProject();
                        break;
                    case 'z':
                        e.preventDefault();
                        this.undo();
                        break;
                    case 'y':
                        e.preventDefault();
                        this.redo();
                        break;
                    case 'c':
                        e.preventDefault();
                        this.copy();
                        break;
                    case 'v':
                        e.preventDefault();
                        this.paste();
                        break;
                }
            }
            
            // 功能键
            switch(e.key) {
                case 'F1':
                    e.preventDefault();
                    this.showHelp();
                    break;
                case 'F5':
                    e.preventDefault();
                    this.refreshView();
                    break;
                case 'Delete':
                    this.deleteSelected();
                    break;
                case 'Escape':
                    this.cancelOperation();
                    break;
            }
        });
    }

    // 右键菜单
    initContextMenus() {
        // 模型树右键菜单
        const treeNodes = document.querySelectorAll('.node-header');
        treeNodes.forEach(node => {
            node.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.showTreeContextMenu(e, node);
            });
        });

        // 画布右键菜单
        const canvas = document.querySelector('.canvas-content');
        canvas?.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            this.showCanvasContextMenu(e);
        });
    }

    showTreeContextMenu(e, node) {
        const nodeName = node.querySelector('.node-label').textContent;
        console.log(`显示节点右键菜单: ${nodeName}`);
        
        // 移除现有的右键菜单
        const existingMenu = document.querySelector('.context-menu');
        if (existingMenu) {
            existingMenu.remove();
        }
        
        // 创建右键菜单
        const contextMenu = document.createElement('div');
        contextMenu.className = 'context-menu';
        contextMenu.innerHTML = `
            <div class="context-menu-item" data-action="edit">
                <i class="fas fa-edit"></i>
                <span>修改</span>
            </div>
            <div class="context-menu-item" data-action="delete">
                <i class="fas fa-trash"></i>
                <span>删除</span>
            </div>
            <div class="context-menu-separator"></div>
            <div class="context-menu-item" data-action="copy">
                <i class="fas fa-copy"></i>
                <span>复制</span>
            </div>
            <div class="context-menu-item" data-action="paste">
                <i class="fas fa-paste"></i>
                <span>粘贴</span>
            </div>
            <div class="context-menu-separator"></div>
            <div class="context-menu-item" data-action="properties">
                <i class="fas fa-cog"></i>
                <span>属性</span>
            </div>
        `;
        
        // 设置菜单位置
        contextMenu.style.position = 'absolute';
        contextMenu.style.left = e.pageX + 'px';
        contextMenu.style.top = e.pageY + 'px';
        contextMenu.style.zIndex = '1000';
        
        // 添加到页面
        document.body.appendChild(contextMenu);
        
        // 添加菜单项点击事件
        contextMenu.addEventListener('click', (e) => {
            const action = e.target.closest('.context-menu-item')?.dataset.action;
            if (action) {
                this.handleContextMenuAction(action, nodeName, node);
            }
            contextMenu.remove();
        });
        
        // 点击其他地方关闭菜单
        document.addEventListener('click', () => {
            contextMenu.remove();
        }, { once: true });
        
        // 阻止事件冒泡
        e.stopPropagation();
    }

    handleContextMenuAction(action, nodeName, node) {
        console.log(`执行右键菜单操作: ${action} - ${nodeName}`);
        
        switch(action) {
            case 'edit':
                this.editTreeNode(nodeName, node);
                break;
            case 'delete':
                this.deleteTreeNode(nodeName, node);
                break;
            case 'copy':
                this.copyTreeNode(nodeName, node);
                break;
            case 'paste':
                this.pasteTreeNode(nodeName, node);
                break;
            case 'properties':
                this.showNodeProperties(nodeName, node);
                break;
        }
    }

    editTreeNode(nodeName, node) {
        this.addMessage('info', `编辑节点: ${nodeName}`);
        console.log(`编辑节点: ${nodeName}`);
        // 这里可以实现编辑功能
    }

    deleteTreeNode(nodeName, node) {
        if (confirm(`确定要删除节点 "${nodeName}" 吗？`)) {
            this.addMessage('warning', `删除节点: ${nodeName}`);
            console.log(`删除节点: ${nodeName}`);
            // 这里可以实现删除功能
        }
    }

    copyTreeNode(nodeName, node) {
        this.addMessage('info', `复制节点: ${nodeName}`);
        console.log(`复制节点: ${nodeName}`);
        // 这里可以实现复制功能
    }

    pasteTreeNode(nodeName, node) {
        this.addMessage('info', `粘贴到节点: ${nodeName}`);
        console.log(`粘贴到节点: ${nodeName}`);
        // 这里可以实现粘贴功能
    }

    showNodeProperties(nodeName, node) {
        this.addMessage('info', `显示节点属性: ${nodeName}`);
        console.log(`显示节点属性: ${nodeName}`);
        // 这里可以显示属性面板
    }

    showCanvasContextMenu(e) {
        console.log('显示画布右键菜单');
        
        // 移除现有的右键菜单
        const existingMenu = document.querySelector('.context-menu');
        if (existingMenu) {
            existingMenu.remove();
        }
        
        // 创建画布右键菜单
        const contextMenu = document.createElement('div');
        contextMenu.className = 'context-menu';
        contextMenu.innerHTML = `
            <div class="context-menu-item" data-action="select">
                <i class="fas fa-mouse-pointer"></i>
                <span>选择</span>
            </div>
            <div class="context-menu-item" data-action="pan">
                <i class="fas fa-arrows-alt"></i>
                <span>平移</span>
            </div>
            <div class="context-menu-item" data-action="zoom">
                <i class="fas fa-search"></i>
                <span>缩放</span>
            </div>
            <div class="context-menu-separator"></div>
            <div class="context-menu-item" data-action="fit">
                <i class="fas fa-expand-arrows-alt"></i>
                <span>适应视图</span>
            </div>
            <div class="context-menu-item" data-action="reset">
                <i class="fas fa-undo"></i>
                <span>重置视图</span>
            </div>
        `;
        
        // 设置菜单位置
        contextMenu.style.position = 'absolute';
        contextMenu.style.left = e.pageX + 'px';
        contextMenu.style.top = e.pageY + 'px';
        contextMenu.style.zIndex = '1000';
        
        // 添加到页面
        document.body.appendChild(contextMenu);
        
        // 添加菜单项点击事件
        contextMenu.addEventListener('click', (e) => {
            const action = e.target.closest('.context-menu-item')?.dataset.action;
            if (action) {
                this.handleCanvasContextMenuAction(action);
            }
            contextMenu.remove();
        });
        
        // 点击其他地方关闭菜单
        document.addEventListener('click', () => {
            contextMenu.remove();
        }, { once: true });
        
        // 阻止事件冒泡
        e.stopPropagation();
    }

    handleCanvasContextMenuAction(action) {
        console.log(`执行画布右键菜单操作: ${action}`);
        
        switch(action) {
            case 'select':
                this.setSelectionMode();
                break;
            case 'pan':
                this.setPanMode();
                break;
            case 'zoom':
                this.setZoomMode();
                break;
            case 'fit':
                this.fitToView();
                break;
            case 'reset':
                this.resetView();
                break;
        }
    }

    resetView() {
        this.addMessage('info', '重置视图');
        console.log('重置视图');
        // 这里可以实现视图重置功能
    }

    // 文件操作方法
    newProject() {
        this.addMessage('info', '创建新项目');
        console.log('新建项目');
    }

    openProject() {
        this.addMessage('info', '打开项目文件');
        console.log('打开项目');
    }

    openRecentFiles() {
        this.addMessage('info', '显示最近打开的文件');
        console.log('打开最近文件');
        // 这里可以显示最近文件列表
    }

    openExampleProjects() {
        this.addMessage('info', '打开示例项目库');
        console.log('打开示例项目');
        // 这里可以显示示例项目列表
    }

    closeProject() {
        if (confirm('确定要关闭当前项目吗？未保存的更改将丢失。')) {
            this.addMessage('info', '项目已关闭');
            console.log('关闭项目');
        }
    }

    saveProject() {
        this.addMessage('success', '项目已保存');
        console.log('保存项目');
    }

    saveAsProject() {
        this.addMessage('info', '另存为新文件');
        console.log('另存为项目');
        // 这里可以打开另存为对话框
    }

    saveScreenshot() {
        this.addMessage('success', '屏幕截图已保存');
        console.log('保存屏幕截图');
        // 这里可以实现截图功能
    }

    importFile() {
        this.addMessage('info', '导入外部文件');
        console.log('导入文件');
        // 支持多种格式：DWG, STEP, IGES等
    }

    exportFile() {
        this.addMessage('info', '导出项目文件');
        console.log('导出文件');
        // 支持多种格式导出
    }

    printPreview() {
        this.addMessage('info', '打开打印预览');
        console.log('打印预览');
        // 显示打印预览窗口
    }

    printModel() {
        this.addMessage('info', '发送到打印机');
        console.log('打印模型');
        // 执行打印操作
    }

    openModelBrowser() {
        this.addMessage('info', '打开模型浏览器');
        console.log('模型浏览器');
        // 打开模型浏览器窗口，显示模型详细信息
    }

    // 编辑操作方法
    undo() {
        this.addMessage('info', '撤销上一步操作');
        console.log('撤销');
    }

    redo() {
        this.addMessage('info', '重做操作');
        console.log('重做');
    }

    copy() {
        this.addMessage('info', '复制选中对象');
        console.log('复制');
    }

    paste() {
        this.addMessage('info', '粘贴对象');
        console.log('粘贴');
    }

    cut() {
        this.addMessage('info', '剪切选中对象');
        console.log('剪切');
    }

    deleteSelected() {
        this.addMessage('info', '删除选中对象');
        console.log('删除选中对象');
    }

    // 视图操作方法
    setView(viewType) {
        this.updateStatusBar('视图', `${viewType}视图`);
        this.addMessage('info', `切换到${viewType}视图`);
        console.log(`设置视图: ${viewType}`);
    }

    setDisplayMode(mode) {
        this.addMessage('info', `切换到${mode}显示模式`);
        console.log(`显示模式: ${mode}`);
    }

    fitToView() {
        this.addMessage('info', '视图已适应模型');
        console.log('适应视图');
    }

    toggleAxes() {
        this.axesEnabled = !this.axesEnabled;
        this.updateStatusBar('坐标轴', this.axesEnabled ? '显示' : '隐藏');
        this.addMessage('info', `坐标轴${this.axesEnabled ? '已显示' : '已隐藏'}`);
    }

    toggleGrid() {
        this.gridEnabled = !this.gridEnabled;
        this.updateStatusBar('网格', this.gridEnabled ? '开启' : '关闭');
        this.addMessage('info', `网格${this.gridEnabled ? '已开启' : '已关闭'}`);
    }

    // 新增视角操作方法
    setDefaultView() {
        this.addMessage('info', '恢复默认视图');
        console.log('设置默认视图');
    }

    setDefaultAllViews() {
        this.addMessage('info', '恢复所有视口的默认视图');
        console.log('设置所有默认视图');
    }

    setVectorView() {
        this.addMessage('info', '设置矢量视图');
        console.log('设置矢量视图');
    }

    zoomIn() {
        this.addMessage('info', '放大视图');
        console.log('放大');
    }

    zoomOut() {
        this.addMessage('info', '缩小视图');
        console.log('缩小');
    }

    zoomPrevious() {
        this.addMessage('info', '恢复上一个缩放状态');
        console.log('上一个缩放');
    }

    boxZoom() {
        this.addMessage('info', '方框缩放模式');
        console.log('方框缩放');
    }

    toggleGlobalAxes() {
        this.addMessage('info', '切换全局轴显示');
        console.log('切换全局轴');
    }

    toggleLocalAxes() {
        this.addMessage('info', '切换局部轴显示');
        console.log('切换局部轴');
    }

    // 显示操作方法
    togglePointNames() {
        this.addMessage('info', '切换管点名称显示');
        console.log('切换管点名称');
    }

    toggleSoilPoints() {
        this.addMessage('info', '切换土壤点显示');
        console.log('切换土壤点');
    }

    togglePointSymbols() {
        this.addMessage('info', '切换管点符号显示');
        console.log('切换管点符号');
    }

    resetDisplayOptions() {
        this.addMessage('info', '重置显示选项');
        console.log('重置显示选项');
    }

    togglePoints() {
        this.addMessage('info', '切换管点显示');
        console.log('切换管点');
    }

    toggleComponents() {
        this.addMessage('info', '切换组件显示');
        console.log('切换组件');
    }

    toggleSegments() {
        this.addMessage('info', '切换分段显示');
        console.log('切换分段');
    }

    toggleSelectedSegments() {
        this.addMessage('info', '切换所选分段显示');
        console.log('切换所选分段');
    }

    toggleUnselectedSegments() {
        this.addMessage('info', '切换未选分段显示');
        console.log('切换未选分段');
    }

    // 选择操作方法
    selectAllPoints() {
        this.addMessage('info', '选择所有点');
        console.log('选择所有点');
    }

    selectPipePoints() {
        this.addMessage('info', '选择管点');
        console.log('选择管点');
    }

    selectByRange() {
        this.addMessage('info', '按范围选择');
        console.log('按范围选择');
    }

    selectByPipeNumber() {
        this.addMessage('info', '按管线号选择');
        console.log('按管线号选择');
    }

    selectCustomPoints() {
        this.addMessage('info', '选择自定义点');
        console.log('选择自定义点');
    }

    selectAdditionalWeight() {
        this.addMessage('info', '选择附加重量');
        console.log('选择附加重量');
    }

    selectAdditionalForces() {
        this.addMessage('info', '选择附加力和力矩');
        console.log('选择附加力和力矩');
    }

    selectWeldPoints() {
        this.addMessage('info', '选择焊接接头点');
        console.log('选择焊接接头点');
    }

    selectComponentSeismicPoints() {
        this.addMessage('info', '选择构件地震系数点');
        console.log('选择构件地震系数点');
    }

    selectPipeSeismicPoints() {
        this.addMessage('info', '选择管点地震系数');
        console.log('选择管点地震系数');
    }

    selectSoilPoints() {
        this.addMessage('info', '选择土壤点');
        console.log('选择土壤点');
    }

    selectDistributedLoadPoints() {
        this.addMessage('info', '选择分布式荷载点');
        console.log('选择分布式荷载点');
    }

    // 插入操作方法
    insertPipe() {
        this.addMessage('info', '进入管道插入模式');
        console.log('插入管道');
    }

    insertElbow() {
        this.addMessage('info', '进入弯头插入模式');
        console.log('插入弯头');
    }

    insertFlange() {
        this.addMessage('info', '进入法兰插入模式');
        console.log('插入法兰');
    }

    insertSupport() {
        this.addMessage('info', '进入支架插入模式');
        console.log('插入支架');
    }

    insertHanger() {
        this.addMessage('info', '进入吊架插入模式');
        console.log('插入吊架');
    }

    insertTee() {
        this.addMessage('info', '进入三通插入模式');
        console.log('插入三通');
    }

    insertReducer() {
        this.addMessage('info', '进入异径接头插入模式');
        console.log('插入异径接头');
    }

    insertWeldJoint() {
        this.addMessage('info', '进入焊接接头插入模式');
        console.log('插入焊接接头');
    }

    insertFixedPoint() {
        this.addMessage('info', '进入固定点插入模式');
        console.log('插入固定点');
    }

    insertSlidingSupport() {
        this.addMessage('info', '进入滑动支撑插入模式');
        console.log('插入滑动支撑');
    }

    insertSpringSupport() {
        this.addMessage('info', '进入弹簧支撑插入模式');
        console.log('插入弹簧支撑');
    }

    insertAdditionalWeight() {
        this.addMessage('info', '进入附加重量插入模式');
        console.log('插入附加重量');
    }

    insertAdditionalForces() {
        this.addMessage('info', '进入附加力和力矩插入模式');
        console.log('插入附加力和力矩');
    }

    insertDistributedLoad() {
        this.addMessage('info', '进入分布式荷载插入模式');
        console.log('插入分布式荷载');
    }

    insertTemperatureLoad() {
        this.addMessage('info', '进入温度荷载插入模式');
        console.log('插入温度荷载');
    }

    insertPressureLoad() {
        this.addMessage('info', '进入压力荷载插入模式');
        console.log('插入压力荷载');
    }

    insertSeismicLoad() {
        this.addMessage('info', '进入地震荷载插入模式');
        console.log('插入地震荷载');
    }

    insertSoilPoint() {
        this.addMessage('info', '进入土壤点插入模式');
        console.log('插入土壤点');
    }

    insertHydrodynamicParams() {
        this.addMessage('info', '进入水动力参数插入模式');
        console.log('插入水动力参数');
    }

    insertPipePoint() {
        this.addMessage('info', '进入管点插入模式');
        console.log('插入管点');
    }

    insertPipeSegment() {
        this.addMessage('info', '进入管段插入模式');
        console.log('插入管段');
    }

    insertComponentSeismicCoefficient() {
        this.addMessage('info', '进入构件地震系数插入模式');
        console.log('插入构件地震系数');
    }

    insertPipeSeismicCoefficient() {
        this.addMessage('info', '进入管点地震系数插入模式');
        console.log('插入管点地震系数');
    }

    insertWorkingPressureTemperature() {
        this.addMessage('info', '进入工作压力和温度插入模式');
        console.log('插入工作压力和温度');
    }

    insertWorkingLoad() {
        this.addMessage('info', '进入工作荷载插入模式');
        console.log('插入工作荷载');
    }

    insertAdditionalDisplacement() {
        this.addMessage('info', '进入附加位移插入模式');
        console.log('插入附加位移');
    }

    copyWorkingCondition() {
        this.addMessage('info', '复制工作工况');
        console.log('复制工作工况');
    }

    // 模式设置方法
    setSelectionMode() {
        this.addMessage('info', '进入选择模式');
        console.log('选择模式');
    }

    setPanMode() {
        this.addMessage('info', '进入平移模式');
        console.log('平移模式');
    }

    setZoomMode() {
        this.addMessage('info', '进入缩放模式');
        console.log('缩放模式');
    }

    // 工具方法
    openViewSettings() {
        this.addMessage('info', '打开视图设置');
        console.log('视图设置');
    }

    openVisibilitySettings() {
        this.addMessage('info', '打开显隐设置');
        console.log('显隐设置');
    }

    addNewVisibilityItem() {
        this.addMessage('info', '添加新显隐项');
        console.log('添加显隐项');
    }

    togglePanelPin() {
        this.addMessage('info', '切换面板固定状态');
        console.log('固定面板');
    }

    showHelp() {
        this.addMessage('info', '显示帮助文档');
        console.log('显示帮助');
    }

    refreshView() {
        this.addMessage('info', '刷新视图');
        console.log('刷新视图');
    }

    cancelOperation() {
        this.addMessage('info', '取消当前操作');
        console.log('取消操作');
    }

    // 消息系统
    addMessage(type, text) {
        const timestamp = new Date().toLocaleTimeString();
        const message = {
            type: type,
            text: text,
            time: timestamp
        };
        
        this.messages.unshift(message);
        
        // 限制消息数量
        if (this.messages.length > 50) {
            this.messages = this.messages.slice(0, 50);
        }
        
        this.updateMessagePanel();
    }

    updateMessagePanel() {
        const messageList = document.querySelector('.message-list');
        if (!messageList) return;
        
        messageList.innerHTML = '';
        
        this.messages.slice(0, 10).forEach(message => {
            const messageItem = document.createElement('div');
            messageItem.className = `message-item ${message.type}`;
            messageItem.innerHTML = `
                <div class="message-icon">
                    <i class="fas fa-${this.getMessageIcon(message.type)}"></i>
                </div>
                <div class="message-content">
                    <div class="message-text">${message.text}</div>
                    <div class="message-time">${message.time}</div>
                </div>
            `;
            messageList.appendChild(messageItem);
        });
    }

    getMessageIcon(type) {
        const icons = {
            'info': 'info-circle',
            'warning': 'exclamation-triangle',
            'success': 'check-circle',
            'error': 'times-circle'
        };
        return icons[type] || 'info-circle';
    }

    clearMessages() {
        this.messages = [];
        this.updateMessagePanel();
        console.log('消息已清空');
    }

    // 状态栏更新
    updateStatusBar(label, value) {
        const statusItems = document.querySelectorAll('.status-item');
        statusItems.forEach(item => {
            const statusLabel = item.querySelector('.status-label');
            const statusValue = item.querySelector('.status-value');
            
            if (statusLabel && statusLabel.textContent.includes(label)) {
                statusValue.textContent = value;
            }
        });
    }

    // 荷载功能方法
    setStaticSeismic() {
        this.addMessage('info', '设置静力地震荷载');
        console.log('设置静力地震荷载');
    }

    controlLoadStepOrder() {
        this.addMessage('info', '控制荷载步加载顺序');
        console.log('控制荷载步加载顺序');
    }

    setSnowLoad() {
        this.addMessage('info', '设置雪荷载');
        console.log('设置雪荷载');
    }

    setBuoyancyLoad() {
        this.addMessage('info', '设置浮力荷载');
        console.log('设置浮力荷载');
    }

    setWaveLoad() {
        this.addMessage('info', '设置波浪荷载');
        console.log('设置波浪荷载');
    }

    deleteWaveLoad() {
        this.addMessage('info', '删除波流荷载');
        console.log('删除波流荷载');
    }

    // 分析功能方法
    setLoadCaseDescription() {
        this.addMessage('info', '设置荷载工况描述');
        console.log('设置荷载工况描述');
    }

    setStaticAnalysisGroup() {
        this.addMessage('info', '设置静力分析组');
        console.log('设置静力分析组');
    }

    runStaticAnalysis() {
        this.addMessage('info', '运行静力分析');
        console.log('运行静力分析');
    }

    controlConvergence() {
        this.addMessage('info', '控制收敛');
        console.log('控制收敛');
    }

    checkConsistency() {
        this.addMessage('info', '执行一致性检查');
        console.log('执行一致性检查');
    }

    checkOverlappingNodes() {
        this.addMessage('info', '检查重合节点');
        console.log('检查重合节点');
    }

    checkDesign() {
        this.addMessage('info', '执行设计检查');
        console.log('执行设计检查');
    }

    discretizeSoil() {
        this.addMessage('info', '土壤离散化');
        console.log('土壤离散化');
    }

    runAllAnalysis() {
        this.addMessage('info', '运行全部分析');
        console.log('运行全部分析');
    }

    deleteAnalysisResults() {
        this.addMessage('info', '删除分析结果');
        console.log('删除分析结果');
    }

    // 结果功能方法
    showModelResults() {
        this.addMessage('info', '显示模型结果');
        console.log('显示模型结果');
    }

    showDNVResults() {
        this.addMessage('info', '显示DNV结果');
        console.log('显示DNV结果');
    }

    showCombinationResults() {
        this.addMessage('info', '显示组合结果');
        console.log('显示组合结果');
    }

    showInputList() {
        this.addMessage('info', '显示输入列表');
        console.log('显示输入列表');
    }

    showOutputList() {
        this.addMessage('info', '显示输出列表');
        console.log('显示输出列表');
    }

    showResultTable() {
        this.addMessage('info', '显示结果表格');
        console.log('显示结果表格');
    }

    showCodeStress() {
        this.addMessage('info', '显示规范应力');
        console.log('显示规范应力');
    }

    showDisplacement() {
        this.addMessage('info', '显示位移结果');
        console.log('显示位移结果');
    }

    showConstraints() {
        this.addMessage('info', '显示约束结果');
        console.log('显示约束结果');
    }

    showForcesAndMoments() {
        this.addMessage('info', '显示力和力矩');
        console.log('显示力和力矩');
    }

    showSoilResults() {
        this.addMessage('info', '显示土壤结果');
        console.log('显示土壤结果');
    }

    showExtendedComponentReport() {
        this.addMessage('info', '显示扩展组件报告');
        console.log('显示扩展组件报告');
    }

    showFilter() {
        this.addMessage('info', '显示过滤器');
        console.log('显示过滤器');
    }

    showOutputReport() {
        this.addMessage('info', '显示输出报告');
        console.log('显示输出报告');
    }

    exportExcelReport() {
        this.addMessage('info', '导出Excel报告');
        console.log('导出Excel报告');
    }

    exportWordInputList() {
        this.addMessage('info', '导出Word输入列表');
        console.log('导出Word输入列表');
    }

    exportWordOutputReport() {
        this.addMessage('info', '导出Word输出报告');
        console.log('导出Word输出报告');
    }

    selectModalRange() {
        this.addMessage('info', '选择模态范围');
        console.log('选择模态范围');
    }

    showSupportResults() {
        this.addMessage('info', '显示支架结果');
        console.log('显示支架结果');
    }

    checkFlange() {
        this.addMessage('info', '法兰校核');
        console.log('法兰校核');
    }

    // 工具选项卡功能
    openGeneralOptions() {
        this.addMessage('info', '打开常规选项');
        console.log('打开常规选项');
    }

    openEditOptions() {
        this.addMessage('info', '打开编辑选项');
        console.log('打开编辑选项');
    }

    openDescription() {
        this.addMessage('info', '打开描述');
        console.log('打开描述');
    }

    openGuideSupport() {
        this.addMessage('info', '打开导向支架');
        console.log('打开导向支架');
    }

    saveResults() {
        this.addMessage('info', '保存结果');
        console.log('保存结果');
    }

    openSQLiteReportManager() {
        this.addMessage('info', '打开SQLite报告管理器');
        console.log('打开SQLite报告管理器');
    }

    measureDistance() {
        this.addMessage('info', '测量距离');
        console.log('测量距离');
    }

    calculateCheck() {
        this.addMessage('info', '核算');
        console.log('核算');
    }

    openLibrary() {
        this.addMessage('info', '打开库');
        console.log('打开库');
    }

    openLibraryEditor() {
        this.addMessage('info', '打开库编辑器');
        console.log('打开库编辑器');
    }

    modifySectionDatabase() {
        this.addMessage('info', '修改截面数据库');
        console.log('修改截面数据库');
    }

    openBatchGenerator() {
        this.addMessage('info', '打开批处理生成器');
        console.log('打开批处理生成器');
    }

    openSettings() {
        this.addMessage('info', '打开设置');
        console.log('打开设置');
    }

    // 支架优化选项卡功能
    resetDefaultValues() {
        this.addMessage('info', '重置缺省值');
        console.log('重置缺省值');
    }

    // 拖拽调整大小功能
    initResizeHandles() {
        this.initPanelResize();
        this.initSectionResize();
        console.log('拖拽功能初始化完成');
    }

    initPanelResize() {
        // 左侧面板拖拽
        const leftResizeHandle = document.querySelector('.left-panel .resize-handle');
        if (leftResizeHandle) {
            this.setupResizeHandle(leftResizeHandle, 'horizontal', 'left-panel');
        }

        // 右侧面板拖拽
        const rightResizeHandle = document.querySelector('.right-panel .resize-handle');
        if (rightResizeHandle) {
            this.setupResizeHandle(rightResizeHandle, 'horizontal', 'right-panel');
        }
    }

    initSectionResize() {
        // 显隐控制区域拖拽
        const visibilityResizeHandle = document.querySelector('.visibility-resize-handle');
        if (visibilityResizeHandle) {
            this.setupResizeHandle(visibilityResizeHandle, 'vertical', 'visibility-section');
        }

        // 消息面板拖拽
        const messageResizeHandle = document.querySelector('.message-resize-handle');
        if (messageResizeHandle) {
            this.setupResizeHandle(messageResizeHandle, 'vertical', 'message-section');
        }
    }

    setupResizeHandle(handle, direction, targetClass) {
        let isResizing = false;
        let startPos = 0;
        let startTargetSize = 0;
        let startAdjacentSize = 0;
        let targetElement = null;
        let adjacentElement = null;

        // 根据目标类名找到对应的元素
        if (targetClass === 'left-panel') {
            targetElement = document.querySelector('.left-panel');
        } else if (targetClass === 'right-panel') {
            targetElement = document.querySelector('.right-panel');
        } else if (targetClass === 'visibility-section') {
            targetElement = document.querySelector('.left-panel .panel-section:nth-child(3)'); // 显隐控制
            adjacentElement = document.querySelector('.left-panel .panel-section:nth-child(2)'); // 模型树
        } else if (targetClass === 'message-section') {
            targetElement = document.querySelector('.right-panel .panel-section:nth-child(3)'); // 消息面板
            adjacentElement = document.querySelector('.right-panel .panel-section:nth-child(2)'); // 属性面板
        }

        if (!targetElement) return;

        const minSectionHeight = 100; // 最小区域高度
        const minPanelWidth = { 'left-panel': 200, 'right-panel': 250 };
        const maxPanelWidth = { 'left-panel': 500, 'right-panel': 600 };

        const startResize = (e) => {
            e.preventDefault();
            isResizing = true;
            
            if (direction === 'horizontal') {
                startPos = e.clientX;
                startTargetSize = targetElement.offsetWidth;
                document.body.classList.add('resizing');
            } else {
                startPos = e.clientY;
                startTargetSize = targetElement.offsetHeight;
                if (adjacentElement) {
                    startAdjacentSize = adjacentElement.offsetHeight;
                }
                document.body.classList.add('resizing-vertical');
            }
            
            handle.classList.add('dragging');
            
            // 添加全局鼠标事件监听
            document.addEventListener('mousemove', resize);
            document.addEventListener('mouseup', stopResize);
        };

        const resize = (e) => {
            if (!isResizing) return;
            
            let newTargetSize;
            
            if (direction === 'horizontal') {
                const delta = e.clientX - startPos;
                if (targetClass === 'left-panel') {
                    newTargetSize = startTargetSize + delta;
                } else { // right-panel
                    newTargetSize = startTargetSize - delta;
                }
                
                // 限制最小和最大宽度
                newTargetSize = Math.max(minPanelWidth[targetClass], Math.min(newTargetSize, maxPanelWidth[targetClass]));
                targetElement.style.width = newTargetSize + 'px';
                            } else {
                    // 垂直拖拽 - 调整目标区域和相邻区域的高度
                    const delta = e.clientY - startPos;
                    newTargetSize = startTargetSize - delta; // 目标区域根据拖拽方向反向调整
                    
                    let newAdjacentSize = startAdjacentSize + delta; // 相邻区域反向调整
                    
                    const totalCombinedHeight = startTargetSize + startAdjacentSize;
                    
                    // 应用最小高度限制
                    if (newTargetSize < minSectionHeight) {
                        newTargetSize = minSectionHeight;
                        newAdjacentSize = totalCombinedHeight - newTargetSize;
                    }
                    if (newAdjacentSize < minSectionHeight) {
                        newAdjacentSize = minSectionHeight;
                        newTargetSize = totalCombinedHeight - newAdjacentSize;
                    }
                    
                    targetElement.style.height = newTargetSize + 'px';
                    if (adjacentElement) {
                        adjacentElement.style.height = newAdjacentSize + 'px';
                        // 为相邻区域添加滚动条
                        adjacentElement.style.overflowY = 'auto';
                    }
                }
        };

        const stopResize = () => {
            if (!isResizing) return;
            
            isResizing = false;
            handle.classList.remove('dragging');
            document.body.classList.remove('resizing', 'resizing-vertical');
            
            // 移除全局事件监听
            document.removeEventListener('mousemove', resize);
            document.removeEventListener('mouseup', stopResize);
            
            // 保存尺寸到本地存储
            this.savePanelSizes();
            
            console.log(`${targetClass} 尺寸调整完成`);
        };

        handle.addEventListener('mousedown', startResize);
    }

    savePanelSizes() {
        const leftPanel = document.querySelector('.left-panel');
        const rightPanel = document.querySelector('.right-panel');
        const modelTree = document.querySelector('.left-panel .panel-section:nth-child(2)');
        const visibilityControl = document.querySelector('.left-panel .panel-section:nth-child(3)');
        const propertyPanel = document.querySelector('.right-panel .panel-section:nth-child(2)');
        const messagePanel = document.querySelector('.right-panel .panel-section:nth-child(3)');
        
        if (leftPanel) localStorage.setItem('leftPanelWidth', leftPanel.style.width);
        if (rightPanel) localStorage.setItem('rightPanelWidth', rightPanel.style.width);
        if (modelTree) localStorage.setItem('modelTreeHeight', modelTree.style.height);
        if (visibilityControl) localStorage.setItem('visibilityControlHeight', visibilityControl.style.height);
        if (propertyPanel) localStorage.setItem('propertyPanelHeight', propertyPanel.style.height);
        if (messagePanel) localStorage.setItem('messagePanelHeight', messagePanel.style.height);
    }

    loadPanelSizes() {
        const leftPanelWidth = localStorage.getItem('leftPanelWidth');
        const rightPanelWidth = localStorage.getItem('rightPanelWidth');
        const modelTreeHeight = localStorage.getItem('modelTreeHeight');
        const visibilityControlHeight = localStorage.getItem('visibilityControlHeight');
        const propertyPanelHeight = localStorage.getItem('propertyPanelHeight');
        const messagePanelHeight = localStorage.getItem('messagePanelHeight');
        
        const leftPanel = document.querySelector('.left-panel');
        const rightPanel = document.querySelector('.right-panel');
        const modelTree = document.querySelector('.left-panel .panel-section:nth-child(2)');
        const visibilityControl = document.querySelector('.left-panel .panel-section:nth-child(3)');
        const propertyPanel = document.querySelector('.right-panel .panel-section:nth-child(2)');
        const messagePanel = document.querySelector('.right-panel .panel-section:nth-child(3)');
        
        if (leftPanelWidth && leftPanel) leftPanel.style.width = leftPanelWidth;
        if (rightPanelWidth && rightPanel) rightPanel.style.width = rightPanelWidth;
        if (modelTreeHeight && modelTree) modelTree.style.height = modelTreeHeight;
        if (visibilityControlHeight && visibilityControl) visibilityControl.style.height = visibilityControlHeight;
        if (propertyPanelHeight && propertyPanel) propertyPanel.style.height = propertyPanelHeight;
        if (messagePanelHeight && messagePanel) messagePanel.style.height = messagePanelHeight;
        
        // 确保在加载时应用滚动条
        if (modelTree) modelTree.style.overflowY = 'auto';
        if (propertyPanel) propertyPanel.style.overflowY = 'auto';
    }
}

/**
 * 通用退出功能 - 返回到数据库主界面
 * 供所有二级菜单页面使用
 */
function goBackToMain() {
    // 直接返回到数据库主界面
    window.location.href = '数据库主界面V2.html';
}

/**
 * 为二级菜单页面添加退出功能
 * 需要在页面加载时调用此函数
 */
function initBackButton() {
    // 为所有退出按钮添加点击事件
    const backButtons = document.querySelectorAll('.back-btn');
    backButtons.forEach(btn => {
        btn.addEventListener('click', goBackToMain);
    });
    
    // 如果页面有onclick="goBack()"的按钮，也替换为新的函数
    const goBackButtons = document.querySelectorAll('[onclick="goBack()"]');
    goBackButtons.forEach(btn => {
        btn.setAttribute('onclick', 'goBackToMain()');
    });
}

// 页面加载时自动初始化退出功能
document.addEventListener('DOMContentLoaded', function() {
    // 检查当前页面是否是二级菜单页面
    const isSubMenuPage = document.querySelector('.back-btn') !== null;
    if (isSubMenuPage) {
        initBackButton();
    }
});

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    window.cioesApp = new CIOESApp();
});

// 窗口大小调整处理
window.addEventListener('resize', () => {
    console.log('窗口大小已调整');
});

// 全局工具函数
window.CIOES = {
    addMessage: (type, text) => window.cioesApp?.addMessage(type, text),
    clearMessages: () => window.cioesApp?.clearMessages(),
    getApp: () => window.cioesApp,
    version: '1.0.0'
};