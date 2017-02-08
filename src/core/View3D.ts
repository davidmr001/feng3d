module feng3d {

    /**
     * 3D视图
     * @author feng 2016-05-01
     */
    export class View3D {

        private _context3D: Context3D;
        private _camera: Camera3D;
        private _scene: Scene3D;
        private _canvas: HTMLCanvasElement;

        /**
         * 默认渲染器
         */
        private defaultRenderer: Renderer;
        /**
         * 鼠标拾取渲染器
         */
        private mouseRenderer: MouseRenderer;

        /**
         * 构建3D视图
         * @param canvas    画布
         * @param scene     3D场景
         * @param camera    摄像机
         */
        constructor(canvas, scene: Scene3D = null, camera: Camera3D = null) {

            assert(canvas instanceof HTMLCanvasElement, `canvas参数必须为 HTMLCanvasElement 类型！`);
            this._canvas = canvas;

            this._context3D = <Context3D>this._canvas.getContext(contextId);

            this.initGL();

            this.scene = scene || new Scene3D();
            this.camera = camera || new Camera3D();

            this.defaultRenderer = new Renderer();
            this.mouseRenderer = new MouseRenderer();

            $mouseKeyInput.addEventListener("mousedown", this.onMousedown, this);

            setInterval(this.drawScene.bind(this), 15);
        }

        /**
         * 初始化GL
         */
        private initGL() {

            this._context3D.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
            this._context3D.clearDepth(1.0);                 // Clear everything
            this._context3D.enable(this._context3D.DEPTH_TEST);           // Enable depth testing
            this._context3D.depthFunc(this._context3D.LEQUAL);            // Near things obscure far things
        }

        /** 3d场景 */
        public get scene(): Scene3D {
            return this._scene;
        }

        public set scene(value: Scene3D) {
            this._scene = value;
        }

        private onMousedown(event: Event) {

            var mouseX = event.data.clientX - this._canvas.offsetLeft;
            var mouseY = event.data.clientY - this._canvas.offsetTop;

            //鼠标拾取渲
            this._context3D.clearColor(0, 0, 0, 1.0);
            this._context3D.clearDepth(1);
            this._context3D.clearStencil(0);
            this._context3D.clear(Context3D.COLOR_BUFFER_BIT | Context3D.DEPTH_BUFFER_BIT);
            this._context3D.viewport(-mouseX, -mouseY, this._canvas.width, this._canvas.height);
            this.mouseRenderer.draw(this._context3D, this._scene, this._camera);

            this._context3D.readBuffer(Context3D.COLOR_ATTACHMENT0);
            var data = new Uint8Array(4);
            this._context3D.readPixels(0, 0, 1, 1, Context3D.RGBA, Context3D.UNSIGNED_BYTE, data)
            var id = data[0] * 255 + data[1];
            console.log(`选中索引3D对象${id}`);

            var object3D = Object3D.getObject3D(id);
            if (object3D.parent)
                object3D.parent.removeChild(object3D);
        }

        /**
         * 绘制场景
         */
        private drawScene() {

            // 默认渲染
            this._context3D.clear(Context3D.COLOR_BUFFER_BIT | Context3D.DEPTH_BUFFER_BIT);
            this._context3D.viewport(0, 0, this._canvas.width, this._canvas.height);
            this.defaultRenderer.draw(this._context3D, this._scene, this._camera);
        }

        /**
         * 摄像机
         */
        public get camera(): Camera3D {
            return this._camera;
        }

        public set camera(value: Camera3D) {

            this._camera = value;
        }
    }
}