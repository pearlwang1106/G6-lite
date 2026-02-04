export class ShaderProgram {
  private program: WebGLProgram;
  private gl: WebGLRenderingContext;

  constructor(gl: WebGLRenderingContext, vertexSource: string, fragmentSource: string) {
    this.gl = gl;
    const vertexShader = this.compileShader(vertexSource, gl.VERTEX_SHADER);
    const fragmentShader = this.compileShader(fragmentSource, gl.FRAGMENT_SHADER);
    
    this.program = gl.createProgram() as WebGLProgram;
    gl.attachShader(this.program, vertexShader);
    gl.attachShader(this.program, fragmentShader);
    gl.linkProgram(this.program);

    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      throw new Error('Shader program linking failed');
    }
  }

  private compileShader(source: string, type: number): WebGLShader {
    const shader = this.gl.createShader(type) as WebGLShader;
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);

    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      throw new Error('Shader compilation failed');
    }

    return shader;
  }

  public use(): void {
    this.gl.useProgram(this.program);
  }

  public getProgram(): WebGLProgram {
    return this.program;
  }
}
