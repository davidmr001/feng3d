module feng3d
{

    /**
     * 材质
     * @author feng 2016-05-02
     */
    export class Material extends RenderDataHolder
    {
        /**
        * 渲染模式
        */
        public renderMode = RenderMode.TRIANGLES;

        /**
         * 着色器名称
         */
        protected shaderName: string;

        /**
         * 构建材质
         */
        constructor()
        {
            super();
            this._single = true;
            this._type = Material;

            Watcher.watch(this, ["shaderName"], this.invalidateRenderData, this);
            Watcher.watch(this, ["renderMode"], this.invalidateRenderData, this);
        }

        /**
		 * 更新渲染数据
		 */
        public updateRenderData(renderContext: RenderContext, renderData: RenderAtomic)
        {
            //
            renderData.shaderParams.renderMode = this.renderMode;
            //
            if (this.shaderName)
            {
                renderData.vertexCode = ShaderLib.getShaderCode(this.shaderName + ".vertex");
                renderData.fragmentCode = ShaderLib.getShaderCode(this.shaderName + ".fragment");
            }else{
                renderData.vertexCode = null;
                renderData.fragmentCode = null;
            }

            super.updateRenderData(renderContext, renderData);
        }
    }
}
